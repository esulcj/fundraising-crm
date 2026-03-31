/**
 * Fundraising CRM — Card Queue (Full Investor Context + Action Panel)
 * ES5 JavaScript
 */
var CRM = CRM || {};

CRM.cards = {
  investors: [],
  currentIndex: 0,
  _cardData: {},
  _prefetchedIndex: -1,
  _touchStartX: 0,
  _touchStartY: 0,
  _touchDelta: 0,
  _swiping: false,

  /** Stage weight for sorting (lower = higher priority) */
  _stageWeight: function (stage) {
    var weights = {
      "ic": 1, "IC": 1,
      "term_sheet": 2, "Term Sheet": 2, "termsheet": 2,
      "dd": 3, "DD": 3,
      "meeting": 4, "Meeting": 4, "first meeting": 4, "First Meeting": 4,
      "intro": 5, "Intro": 5,
      "lead": 6, "Lead": 6,
      "closed": 7, "Closed": 7, "soft commit": 7, "Soft Commit": 7
    };
    return weights[stage] || 6;
  },

  /** Map stage to CSS class suffix */
  _stageCls: function (stage) {
    var s = (stage || "").toLowerCase().replace(/[\s_]/g, "");
    var map = {
      "lead": "lead", "intro": "intro", "meeting": "meeting",
      "firstmeeting": "meeting", "dd": "dd", "ic": "ic",
      "termsheet": "termsheet", "closed": "closed", "softcommit": "closed"
    };
    return map[s] || "lead";
  },

  /** Stage badge colors mapping */
  _stageColor: function (stage) {
    var s = (stage || "").toLowerCase().replace(/[\s_]/g, "");
    var map = {
      "lead": "#94a3b8", "intro": "#60a5fa",
      "meeting": "#f59e0b", "firstmeeting": "#f59e0b",
      "dd": "#60a5fa", "ic": "#f97316",
      "termsheet": "#ef4444", "closed": "#10b981", "softcommit": "#10b981"
    };
    return map[s] || "#94a3b8";
  },

  /** Calculate days since a date string */
  _daysSince: function (dateStr) {
    if (!dateStr) return 999;
    var then = new Date(dateStr);
    var now = new Date();
    var diff = now.getTime() - then.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  },

  /** Format relative date */
  _relativeDate: function (dateStr) {
    if (!dateStr) return "";
    var then = new Date(dateStr);
    var now = new Date();
    var diffMs = then.getTime() - now.getTime();
    var diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    if (diffDays < 0) return Math.abs(diffDays) + " days ago";
    return "In " + diffDays + " days";
  },

  /** Sentiment color */
  _sentimentColor: function (sentiment) {
    var s = (sentiment || "").toLowerCase();
    var map = {
      "excited": "#10b981", "neutral": "#94a3b8",
      "cautious": "#f59e0b", "skeptical": "#ef4444"
    };
    return map[s] || "#94a3b8";
  },

  /** DD status color */
  _ddStatusColor: function (status) {
    var s = (status || "").toLowerCase();
    var map = {
      "asked": "#f59e0b", "in_progress": "#60a5fa",
      "answered": "#10b981", "shared": "#94a3b8"
    };
    return map[s] || "#94a3b8";
  },

  /** Determine card urgency */
  _cardStatus: function (inv) {
    if (inv.snooze_until) {
      var snoozeDate = new Date(inv.snooze_until);
      if (snoozeDate > new Date()) return "snoozed";
    }
    var threshold = inv.stale_threshold_days || 14;
    var days = CRM.cards._daysSince(inv.last_contact);
    if (days > threshold) return "overdue";
    if (days >= threshold - 1) return "due";
    return "ok";
  },

  /** Sort investors for the queue */
  _sortInvestors: function (list) {
    var self = CRM.cards;
    list.sort(function (a, b) {
      var statusA = self._cardStatus(a);
      var statusB = self._cardStatus(b);
      if (statusA === "snoozed" && statusB !== "snoozed") return 1;
      if (statusB === "snoozed" && statusA !== "snoozed") return -1;
      var prio = { "overdue": 0, "due": 1, "ok": 2, "snoozed": 3 };
      var pa = prio[statusA] !== undefined ? prio[statusA] : 2;
      var pb = prio[statusB] !== undefined ? prio[statusB] : 2;
      if (pa !== pb) return pa - pb;
      var wa = self._stageWeight(a.stage);
      var wb = self._stageWeight(b.stage);
      if (wa !== wb) return wa - wb;
      var da = self._daysSince(a.last_contact);
      var db = self._daysSince(b.last_contact);
      return db - da;
    });
    return list;
  },

  /** Fetch all data for a card */
  _fetchCardData: function (inv) {
    var id = inv.id;
    return Promise.all([
      CRM.api.get("/contacts?investor_id=" + id).catch(function () { return []; }),
      CRM.api.get("/interactions?investor_id=" + id).catch(function () { return []; }),
      CRM.api.get("/actions?investor_id=" + id + "&status=pending").catch(function () { return []; }),
      CRM.api.get("/dd-items?investor_id=" + id).catch(function () { return []; }),
      CRM.api.get("/follow-ups?investor_id=" + id).catch(function () { return []; })
    ]).then(function (results) {
      return {
        contacts: Array.isArray(results[0]) ? results[0] : [],
        interactions: Array.isArray(results[1]) ? results[1] : [],
        actions: Array.isArray(results[2]) ? results[2] : [],
        ddItems: Array.isArray(results[3]) ? results[3] : [],
        followUps: Array.isArray(results[4]) ? results[4] : []
      };
    });
  },

  /** Pre-fetch next card data */
  _prefetchNext: function () {
    var self = CRM.cards;
    var nextIdx = self.currentIndex + 1;
    if (nextIdx >= self.investors.length) return;
    if (self._prefetchedIndex === nextIdx) return;
    var inv = self.investors[nextIdx];
    self._prefetchedIndex = nextIdx;
    self._fetchCardData(inv).then(function (data) {
      self._cardData[inv.id] = data;
    });
  },

  /** Create a DOM element with class and optional text */
  _el: function (tag, cls, text) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined) el.textContent = text;
    return el;
  },

  /** Initialize the card queue */
  init: function () {
    var self = CRM.cards;
    var stage = document.getElementById("cq-stage");
    if (!stage) return;

    CRM.components.loading(stage);
    self._bindKeyboard();
    self._bindTouch();

    CRM.api.get("/investors").then(function (data) {
      var list = Array.isArray(data) ? data : [];
      self.investors = self._sortInvestors(list);
      self.currentIndex = 0;

      if (self.investors.length === 0) {
        self._renderEmpty();
        return;
      }

      self._renderCard();
      self._updateProgress();
      self._updateCounter();
    }).catch(function () {
      CRM.components.errorBanner(stage, "Failed to load investors", function () {
        self.init();
      });
    });
  },

  /** Render the current card with full context */
  _renderCard: function () {
    var self = CRM.cards;
    var inv = self.investors[self.currentIndex];
    if (!inv) {
      self._renderEmpty();
      return;
    }

    var stage = document.getElementById("cq-stage");
    stage.innerHTML = "";

    var card = self._el("div", "cq-card cq-card--" + self._cardStatus(inv));
    card.id = "cq-card";

    // Show loading skeleton first
    var loadingLeft = self._el("div", "cq-col cq-col--left");
    CRM.components.loading(loadingLeft);
    var loadingRight = self._el("div", "cq-col cq-col--right");
    card.appendChild(loadingLeft);
    card.appendChild(loadingRight);
    stage.appendChild(card);

    // Check if we have cached data
    var cached = self._cardData[inv.id];
    if (cached) {
      self._buildCard(inv, cached);
      self._prefetchNext();
      return;
    }

    self._fetchCardData(inv).then(function (data) {
      self._cardData[inv.id] = data;
      self._buildCard(inv, data);
      self._prefetchNext();
    }).catch(function () {
      stage.innerHTML = "";
      CRM.components.errorBanner(stage, "Failed to load card data", function () {
        self._renderCard();
      });
    });
  },

  /** Build the full two-column card */
  _buildCard: function (inv, data) {
    var self = CRM.cards;
    var stage = document.getElementById("cq-stage");
    stage.innerHTML = "";

    var card = self._el("div", "cq-card cq-card--" + self._cardStatus(inv));
    card.id = "cq-card";

    // ── LEFT COLUMN (60%) ──
    var left = self._el("div", "cq-col cq-col--left");

    // 1. Header: name + stage badge
    var header = self._el("div", "cq-section cq-header-section");
    var nameEl = self._el("div", "cq-investor-name", inv.name || "Unknown");
    header.appendChild(nameEl);
    if (inv.stage) {
      var badge = self._el("span", "cq-stage-badge cq-stage-badge--" + self._stageCls(inv.stage), inv.stage);
      header.appendChild(badge);
    }
    left.appendChild(header);

    // 2. Fund info
    if (inv.fund_size || inv.thesis) {
      var fundSection = self._el("div", "cq-section");
      if (inv.fund_size) {
        var fundLine = self._el("div", "cq-fund-size", inv.fund_size);
        fundSection.appendChild(fundLine);
      }
      if (inv.thesis) {
        var thesisEl = self._el("div", "cq-thesis");
        var thesisText = inv.thesis;
        if (thesisText.length > 160) thesisText = thesisText.substring(0, 160) + "...";
        thesisEl.textContent = thesisText;
        fundSection.appendChild(thesisEl);
      }
      left.appendChild(fundSection);
    }

    // 3. Introducer
    if (inv.intro_source || inv.intro_person) {
      var introSection = self._el("div", "cq-section");
      var introLabel = self._el("div", "cq-section-label", "Introduction");
      introSection.appendChild(introLabel);
      var introText = [];
      if (inv.intro_person) introText.push(inv.intro_person);
      if (inv.intro_source) introText.push("via " + inv.intro_source);
      var introVal = self._el("div", "cq-section-value", introText.join(" "));
      introSection.appendChild(introVal);
      left.appendChild(introSection);
    }

    // 4. Key contacts
    if (data.contacts.length > 0) {
      var contactSection = self._el("div", "cq-section");
      var contactLabel = self._el("div", "cq-section-label", "Key Contacts");
      contactSection.appendChild(contactLabel);
      for (var ci = 0; ci < data.contacts.length; ci++) {
        var c = data.contacts[ci];
        var contactRow = self._el("div", "cq-contact-row");
        var cName = self._el("span", "cq-contact-name", c.name);
        contactRow.appendChild(cName);
        if (c.title) {
          var cTitle = self._el("span", "cq-contact-title", c.title);
          contactRow.appendChild(cTitle);
        }
        if (c.email) {
          var cEmail = self._el("span", "cq-contact-email", c.email);
          contactRow.appendChild(cEmail);
        }
        contactSection.appendChild(contactRow);
      }
      left.appendChild(contactSection);
    }

    // Sort interactions by created_at desc
    var interactions = data.interactions.slice();
    interactions.sort(function (a, b) {
      var da = a.created_at || "";
      var db = b.created_at || "";
      return da > db ? -1 : da < db ? 1 : 0;
    });

    // 5. Last interaction
    var lastInteraction = interactions[0] || null;
    if (lastInteraction) {
      var lastSection = self._el("div", "cq-section");
      var lastLabel = self._el("div", "cq-section-label", "Last Interaction");
      lastSection.appendChild(lastLabel);
      var lastDate = self._el("span", "cq-interaction-date", (lastInteraction.created_at || "").split("T")[0]);
      var lastSummary = self._el("span", "cq-interaction-summary", lastInteraction.summary || "No summary");
      var lastRow = self._el("div", "cq-interaction-row");
      lastRow.appendChild(lastDate);
      lastRow.appendChild(lastSummary);
      lastSection.appendChild(lastRow);
      left.appendChild(lastSection);
    }

    // 6. All interactions timeline
    if (interactions.length > 0) {
      var timelineSection = self._el("div", "cq-section");
      var timelineLabel = self._el("div", "cq-section-label", "Interaction History (" + interactions.length + ")");
      timelineSection.appendChild(timelineLabel);
      var timeline = self._el("div", "cq-timeline");
      for (var ii = 0; ii < interactions.length; ii++) {
        var ix = interactions[ii];
        var tRow = self._el("div", "cq-timeline-item");
        var tDate = self._el("span", "cq-timeline-date", (ix.created_at || "").split("T")[0]);
        tRow.appendChild(tDate);
        if (ix.type) {
          var tType = self._el("span", "cq-timeline-type", ix.type);
          tRow.appendChild(tType);
        }
        var tSummary = self._el("span", "cq-timeline-summary", ix.summary || "");
        tRow.appendChild(tSummary);
        timeline.appendChild(tRow);
      }
      timelineSection.appendChild(timeline);
      left.appendChild(timelineSection);
    }

    // 7. Assessment / sentiment
    if (lastInteraction && lastInteraction.sentiment) {
      var assessSection = self._el("div", "cq-section");
      var assessLabel = self._el("div", "cq-section-label", "Assessment");
      assessSection.appendChild(assessLabel);
      var sentimentBadge = self._el("span", "cq-sentiment-badge", lastInteraction.sentiment);
      sentimentBadge.style.background = self._sentimentColor(lastInteraction.sentiment);
      assessSection.appendChild(sentimentBadge);
      if (lastInteraction.notes || inv.notes) {
        var careText = self._el("div", "cq-assess-notes", lastInteraction.notes || inv.notes);
        assessSection.appendChild(careText);
      }
      left.appendChild(assessSection);
    }

    // 8. DD questions
    var openDd = [];
    for (var di = 0; di < data.ddItems.length; di++) {
      if (data.ddItems[di].status !== "shared") {
        openDd.push(data.ddItems[di]);
      }
    }
    if (openDd.length > 0) {
      var ddSection = self._el("div", "cq-section");
      var ddLabel = self._el("div", "cq-section-label", "DD Questions (" + openDd.length + ")");
      ddSection.appendChild(ddLabel);
      for (var ddi = 0; ddi < openDd.length; ddi++) {
        var dd = openDd[ddi];
        var ddRow = self._el("div", "cq-dd-row");
        var ddStatus = self._el("span", "cq-dd-status", dd.status || "asked");
        ddStatus.style.background = self._ddStatusColor(dd.status);
        ddRow.appendChild(ddStatus);
        var ddQ = self._el("span", "cq-dd-question", dd.question);
        ddRow.appendChild(ddQ);
        ddSection.appendChild(ddRow);
      }
      left.appendChild(ddSection);
    }

    // 9. Days since last touch
    var daysSinceSection = self._el("div", "cq-section cq-days-section");
    var days = self._daysSince(lastInteraction ? lastInteraction.created_at : (inv.last_contact || inv.updated_at));
    var daysNum = self._el("div", "cq-days-number");
    daysNum.textContent = days === 999 ? "?" : days;
    if (days > 3) {
      daysNum.style.color = "#EF4444";
    } else if (days >= 2) {
      daysNum.style.color = "#F59E0B";
    } else {
      daysNum.style.color = "#10B981";
    }
    daysSinceSection.appendChild(daysNum);
    var daysLabel = self._el("div", "cq-days-label", "days since last touch");
    daysSinceSection.appendChild(daysLabel);
    left.appendChild(daysSinceSection);

    // 10. Stage signals
    if (lastInteraction && lastInteraction.sentiment) {
      var signalSection = self._el("div", "cq-section");
      var sentLower = (lastInteraction.sentiment || "").toLowerCase();
      if (sentLower === "excited") {
        var advanceSignal = self._el("div", "cq-signal cq-signal--advance", "Advance?");
        signalSection.appendChild(advanceSignal);
        left.appendChild(signalSection);
      } else if (sentLower === "skeptical") {
        var riskSignal = self._el("div", "cq-signal cq-signal--risk", "At risk");
        signalSection.appendChild(riskSignal);
        left.appendChild(signalSection);
      }
    }

    card.appendChild(left);

    // ── RIGHT COLUMN (40%) ──
    var right = self._el("div", "cq-col cq-col--right");

    // Sort actions by due_date ascending
    var actions = data.actions.slice();
    actions.sort(function (a, b) {
      var da = a.due_date || a.scheduled_date || "9999";
      var db = b.due_date || b.scheduled_date || "9999";
      return da < db ? -1 : da > db ? 1 : 0;
    });
    var topAction = actions[0] || null;

    // 1. Action item
    var actionSection = self._el("div", "cq-section");
    var actionLabel = self._el("div", "cq-section-label", "Next Action");
    actionSection.appendChild(actionLabel);
    if (topAction) {
      var actionDesc = self._el("div", "cq-action-desc", topAction.description);
      actionSection.appendChild(actionDesc);
      // 2. Due date
      var dueDate = topAction.due_date || topAction.scheduled_date;
      if (dueDate) {
        var dueEl = self._el("div", "cq-action-due");
        var relDate = self._relativeDate(dueDate);
        dueEl.textContent = relDate;
        if (relDate.indexOf("ago") !== -1) {
          dueEl.style.color = "#ef4444";
        }
        actionSection.appendChild(dueEl);
      }
      actionSection.setAttribute("data-action-id", topAction.id);
    } else {
      var noAction = self._el("div", "cq-no-action", "No pending actions");
      actionSection.appendChild(noAction);
    }
    right.appendChild(actionSection);

    // 3. Draft email
    var emailSection = self._el("div", "cq-section");
    var emailLabel = self._el("div", "cq-section-label", "Draft Email");
    emailSection.appendChild(emailLabel);

    var contactName = "";
    if (data.contacts.length > 0) {
      contactName = data.contacts[0].name || "";
    } else if (inv.contact_name) {
      contactName = inv.contact_name;
    }
    var lastSummaryText = lastInteraction ? (lastInteraction.summary || "our last conversation") : "our previous discussion";
    var actionText = topAction ? topAction.description : "discuss next steps";

    var draftText = "Hi " + (contactName.split(" ")[0] || "there") + ",\n\n" +
      "Following up on " + lastSummaryText + ".\n\n" +
      actionText + "\n\n" +
      "Best,\nTheo";

    var textarea = document.createElement("textarea");
    textarea.className = "cq-draft-email";
    textarea.id = "cq-draft-email";
    textarea.rows = 6;
    textarea.value = draftText;
    emailSection.appendChild(textarea);

    var copyBtn = self._el("button", "cq-btn cq-btn--copy", "Copy Draft");
    copyBtn.onclick = function () { self._copyDraft(); };
    emailSection.appendChild(copyBtn);
    right.appendChild(emailSection);

    // 4. Action buttons
    var btnSection = self._el("div", "cq-section cq-action-buttons");
    var doneBtn = self._el("button", "cq-btn cq-btn--done", "Done");
    doneBtn.onclick = function () { self._doDone(inv, topAction); };
    btnSection.appendChild(doneBtn);

    var skipBtn = self._el("button", "cq-btn cq-btn--skip", "Skip");
    skipBtn.onclick = function () { self._doSkip(); };
    btnSection.appendChild(skipBtn);

    var snoozeBtn = self._el("button", "cq-btn cq-btn--snooze", "Snooze");
    snoozeBtn.onclick = function () { self._showSnoozeInput(inv); };
    btnSection.appendChild(snoozeBtn);
    right.appendChild(btnSection);

    // Snooze date input (hidden by default)
    var snoozeWrap = self._el("div", "cq-snooze-wrap");
    snoozeWrap.id = "cq-snooze-wrap";
    snoozeWrap.style.display = "none";
    var snoozeInput = document.createElement("input");
    snoozeInput.type = "date";
    snoozeInput.className = "cq-snooze-input";
    snoozeInput.id = "cq-snooze-date";
    var d = new Date();
    d.setDate(d.getDate() + 7);
    snoozeInput.value = d.toISOString().split("T")[0];
    snoozeWrap.appendChild(snoozeInput);
    var snoozeConfirm = self._el("button", "cq-btn cq-btn--snooze-confirm", "Confirm Snooze");
    snoozeConfirm.onclick = function () {
      self._doSnooze(inv.id, snoozeInput.value);
    };
    snoozeWrap.appendChild(snoozeConfirm);
    right.appendChild(snoozeWrap);

    // 5. Stage change
    var stageSection = self._el("div", "cq-section");
    var stageLabel = self._el("div", "cq-section-label", "Stage");
    stageSection.appendChild(stageLabel);
    var stageSelect = document.createElement("select");
    stageSelect.className = "cq-stage-select";
    stageSelect.id = "cq-stage-select";
    var stages = ["Lead", "Intro", "Meeting", "DD", "IC", "Term Sheet", "Closed"];
    for (var si = 0; si < stages.length; si++) {
      var opt = document.createElement("option");
      opt.value = stages[si];
      opt.textContent = stages[si];
      if ((inv.stage || "").toLowerCase() === stages[si].toLowerCase()) {
        opt.selected = true;
      }
      stageSelect.appendChild(opt);
    }
    stageSelect.onchange = function () {
      self._changeStage(inv.id, stageSelect.value);
    };
    stageSection.appendChild(stageSelect);
    right.appendChild(stageSection);

    // 6. Notes field
    var notesSection = self._el("div", "cq-section");
    var notesLabel = self._el("div", "cq-section-label", "Notes");
    notesSection.appendChild(notesLabel);
    var notesArea = document.createElement("textarea");
    notesArea.className = "cq-notes-area";
    notesArea.id = "cq-notes-area";
    notesArea.rows = 3;
    notesArea.value = inv.notes || "";
    notesArea.onblur = function () {
      self._saveNotes(inv.id, notesArea.value);
    };
    notesSection.appendChild(notesArea);
    right.appendChild(notesSection);

    card.appendChild(right);
    stage.appendChild(card);
  },

  /** Copy draft email to clipboard */
  _copyDraft: function () {
    var ta = document.getElementById("cq-draft-email");
    if (!ta) return;
    var text = ta.value;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        CRM.components.toast("Copied to clipboard", "success");
      }).catch(function () {
        CRM.cards._copyFallback(text);
      });
    } else {
      CRM.cards._copyFallback(text);
    }
  },

  _copyFallback: function (text) {
    var tmp = document.createElement("textarea");
    tmp.value = text;
    tmp.style.position = "fixed";
    tmp.style.left = "-9999px";
    document.body.appendChild(tmp);
    tmp.select();
    try {
      document.execCommand("copy");
      CRM.components.toast("Copied to clipboard", "success");
    } catch (e) {
      CRM.components.toast("Failed to copy", "error");
    }
    document.body.removeChild(tmp);
  },

  /** Done: mark action complete and advance */
  _doDone: function (inv, action) {
    var self = CRM.cards;
    if (action && action.id) {
      CRM.api.patch("/actions/" + action.id, { status: "done", completed_at: new Date().toISOString() }).then(function () {
        CRM.components.toast("Action marked done", "success");
      }).catch(function () {
        CRM.components.toast("Failed to update action", "error");
      });
    }
    // Invalidate cache and advance
    delete self._cardData[inv.id];
    self._advance("left");
  },

  /** Skip: advance to next card, no API call */
  _doSkip: function () {
    CRM.cards._advance("left");
  },

  /** Show snooze date input */
  _showSnoozeInput: function (inv) {
    var wrap = document.getElementById("cq-snooze-wrap");
    if (wrap) {
      wrap.style.display = wrap.style.display === "none" ? "flex" : "none";
      if (wrap.style.display === "flex") {
        var input = document.getElementById("cq-snooze-date");
        if (input) input.focus();
      }
    }
  },

  /** Execute snooze */
  _doSnooze: function (investorId, dateStr) {
    var self = CRM.cards;
    CRM.api.patch("/investors/" + investorId, { snooze_until: dateStr }).then(function () {
      CRM.components.toast("Snoozed until " + dateStr, "info");
      var inv = self.investors[self.currentIndex];
      if (inv) inv.snooze_until = dateStr;
      delete self._cardData[investorId];
      self.investors = self._sortInvestors(self.investors);
      self._renderCard();
      self._updateProgress();
      self._updateCounter();
    }).catch(function () {
      CRM.components.toast("Failed to snooze", "error");
    });
  },

  /** Change investor stage */
  _changeStage: function (investorId, newStage) {
    var self = CRM.cards;
    CRM.api.patch("/investors/" + investorId, { stage: newStage }).then(function () {
      CRM.components.toast("Stage updated to " + newStage, "success");
      var inv = self.investors[self.currentIndex];
      if (inv) inv.stage = newStage;
    }).catch(function () {
      CRM.components.toast("Failed to update stage", "error");
    });
  },

  /** Save investor notes */
  _saveNotes: function (investorId, notes) {
    CRM.api.patch("/investors/" + investorId, { notes: notes }).catch(function () {
      CRM.components.toast("Failed to save notes", "error");
    });
  },

  /** Advance to next card with slide animation */
  _advance: function (direction) {
    var self = CRM.cards;
    if (self.currentIndex >= self.investors.length - 1) {
      self._renderEmpty();
      return;
    }

    var card = document.getElementById("cq-card");
    if (card) {
      card.className = card.className + " cq-card--slide-" + direction;
    }

    setTimeout(function () {
      self.currentIndex++;
      self._renderCard();
      self._updateProgress();
      self._updateCounter();

      var newCard = document.getElementById("cq-card");
      if (newCard) {
        newCard.className = newCard.className + " cq-card--enter-" + direction;
        void newCard.offsetWidth;
        newCard.className = newCard.className.replace(" cq-card--enter-" + direction, "");
      }
    }, 200);
  },

  /** Navigate to previous card */
  prev: function () {
    var self = CRM.cards;
    if (self.currentIndex <= 0) return;

    var card = document.getElementById("cq-card");
    if (card) {
      card.className = card.className + " cq-card--slide-right";
    }

    setTimeout(function () {
      self.currentIndex--;
      self._renderCard();
      self._updateProgress();
      self._updateCounter();

      var newCard = document.getElementById("cq-card");
      if (newCard) {
        newCard.className = newCard.className + " cq-card--enter-right";
        void newCard.offsetWidth;
        newCard.className = newCard.className.replace(" cq-card--enter-right", "");
      }
    }, 200);
  },

  /** Open investor detail page */
  openDetail: function () {
    var inv = CRM.cards.investors[CRM.cards.currentIndex];
    if (inv) {
      window.location.href = "/investor.html?id=" + inv.id;
    }
  },

  /** Render empty state */
  _renderEmpty: function () {
    var self = CRM.cards;
    var stage = document.getElementById("cq-stage");
    stage.innerHTML = "";
    var empty = self._el("div", "cq-empty");
    var text = self._el("div", "cq-empty__text", "All caught up! No investors to process.");
    empty.appendChild(text);
    var link = document.createElement("a");
    link.className = "cq-empty__link";
    link.href = "/";
    link.textContent = "Back to dashboard";
    empty.appendChild(link);
    stage.appendChild(empty);
  },

  /** Update progress bar */
  _updateProgress: function () {
    var bar = document.getElementById("cq-progress");
    if (!bar) return;
    var total = CRM.cards.investors.length;
    if (total === 0) { bar.style.width = "100%"; return; }
    var pct = ((CRM.cards.currentIndex + 1) / total) * 100;
    bar.style.width = pct + "%";
  },

  /** Update counter text */
  _updateCounter: function () {
    var el = document.getElementById("cq-counter");
    if (!el) return;
    var total = CRM.cards.investors.length;
    if (total === 0) { el.textContent = "0 of 0"; return; }
    el.textContent = (CRM.cards.currentIndex + 1) + " of " + total;
  },

  /** Bind keyboard listeners */
  _bindKeyboard: function () {
    var self = CRM.cards;
    document.addEventListener("keydown", function (e) {
      var tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      switch (e.key) {
        case "ArrowRight":
        case "d":
          e.preventDefault();
          var inv = self.investors[self.currentIndex];
          var actionSection = document.querySelector("[data-action-id]");
          var actionId = actionSection ? actionSection.getAttribute("data-action-id") : null;
          if (inv && actionId) {
            self._doDone(inv, { id: actionId });
          } else if (inv) {
            self._doDone(inv, null);
          }
          break;
        case "ArrowLeft":
        case "s":
          e.preventDefault();
          self._doSkip();
          break;
        case "z":
          e.preventDefault();
          var curInv = self.investors[self.currentIndex];
          if (curInv) self._showSnoozeInput(curInv);
          break;
        case "e":
          e.preventDefault();
          var emailEl = document.getElementById("cq-draft-email");
          if (emailEl) emailEl.focus();
          break;
        case "c":
          e.preventDefault();
          self._copyDraft();
          break;
        case "Enter":
          e.preventDefault();
          self.openDetail();
          break;
      }
    });
  },

  /** Bind touch/swipe listeners */
  _bindTouch: function () {
    var self = CRM.cards;
    var stageEl = document.getElementById("cq-stage");
    if (!stageEl) return;

    stageEl.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1) return;
      self._touchStartX = e.touches[0].clientX;
      self._touchStartY = e.touches[0].clientY;
      self._touchDelta = 0;
      self._swiping = false;
    }, { passive: true });

    stageEl.addEventListener("touchmove", function (e) {
      if (e.touches.length !== 1) return;
      var dx = e.touches[0].clientX - self._touchStartX;
      var dy = e.touches[0].clientY - self._touchStartY;
      if (!self._swiping && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
        self._swiping = true;
      }
      if (!self._swiping) return;
      self._touchDelta = dx;
      var card = document.getElementById("cq-card");
      if (card) {
        card.style.transform = "translateX(" + dx + "px) rotate(" + (dx * 0.05) + "deg)";
        card.style.transition = "none";
      }
    }, { passive: true });

    stageEl.addEventListener("touchend", function () {
      var card = document.getElementById("cq-card");
      if (!self._swiping || !card) {
        if (card) { card.style.transform = ""; card.style.transition = ""; }
        return;
      }

      if (self._touchDelta > 100) {
        card.className = card.className + " cq-card--flash-green";
        setTimeout(function () {
          var inv = self.investors[self.currentIndex];
          var actionSection = document.querySelector("[data-action-id]");
          var actionId = actionSection ? actionSection.getAttribute("data-action-id") : null;
          if (inv) self._doDone(inv, actionId ? { id: actionId } : null);
        }, 300);
      } else if (self._touchDelta < -100) {
        card.className = card.className + " cq-card--flash-amber";
        setTimeout(function () {
          var inv = self.investors[self.currentIndex];
          if (inv) {
            var d = new Date();
            d.setDate(d.getDate() + 7);
            self._doSnooze(inv.id, d.toISOString().split("T")[0]);
          }
        }, 300);
      } else {
        card.style.transform = "";
        card.style.transition = "";
      }

      self._swiping = false;
      self._touchDelta = 0;
    }, { passive: true });
  }
};

document.addEventListener("DOMContentLoaded", function () {
  CRM.cards.init();
});
