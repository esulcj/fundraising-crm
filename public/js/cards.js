/**
 * Fundraising CRM — Card Queue (Superhuman-style Investor Processing)
 * ES5 JavaScript
 */
var CRM = CRM || {};

CRM.cards = {
  investors: [],
  currentIndex: 0,
  filters: { stage: null, tier: null, status: null },
  _touchStartX: 0,
  _touchStartY: 0,
  _touchDelta: 0,
  _swiping: false,
  _snoozeVisible: false,

  /** Stage weight for sorting (lower = higher priority) */
  _stageWeight: function (stage) {
    var weights = {
      "ic": 1, "IC": 1,
      "term_sheet": 2, "Term Sheet": 2, "termsheet": 2,
      "dd": 3, "DD": 3,
      "meeting": 4, "Meeting": 4,
      "intro": 5, "Intro": 5,
      "lead": 6, "Lead": 6,
      "closed": 7, "Closed": 7
    };
    return weights[stage] || 6;
  },

  /** Map stage to CSS class suffix */
  _stageCls: function (stage) {
    var s = (stage || "").toLowerCase().replace(/[\s_]/g, "");
    var map = {
      "lead": "lead", "intro": "intro", "meeting": "meeting",
      "dd": "dd", "ic": "ic", "termsheet": "termsheet", "closed": "closed"
    };
    return map[s] || "lead";
  },

  /** Calculate days since last contact */
  _daysSince: function (dateStr) {
    if (!dateStr) return 999;
    var then = new Date(dateStr);
    var now = new Date();
    var diff = now.getTime() - then.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  },

  /** Determine card status class */
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

      // Snoozed go to end
      if (statusA === "snoozed" && statusB !== "snoozed") return 1;
      if (statusB === "snoozed" && statusA !== "snoozed") return -1;

      // Priority order: overdue > due > ok
      var prio = { "overdue": 0, "due": 1, "ok": 2, "snoozed": 3 };
      var pa = prio[statusA] !== undefined ? prio[statusA] : 2;
      var pb = prio[statusB] !== undefined ? prio[statusB] : 2;
      if (pa !== pb) return pa - pb;

      // Same priority: sort by stage weight
      var wa = self._stageWeight(a.stage);
      var wb = self._stageWeight(b.stage);
      if (wa !== wb) return wa - wb;

      // Same stage: older last contact first
      var da = self._daysSince(a.last_contact);
      var db = self._daysSince(b.last_contact);
      return db - da;
    });
    return list;
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
      // Filter out snoozed with future dates (keep them but sorted last)
      self.investors = self._sortInvestors(list);
      self.currentIndex = 0;

      if (self.investors.length === 0) {
        self._renderEmpty();
        return;
      }

      self._renderCard();
      self._updateProgress();
      self._updateCounter();
    }).catch(function (err) {
      CRM.components.errorBanner(stage, "Failed to load investors", function () {
        self.init();
      });
    });
  },

  /** Render the current card */
  _renderCard: function () {
    var self = CRM.cards;
    var inv = self.investors[self.currentIndex];
    if (!inv) {
      self._renderEmpty();
      return;
    }

    var stage = document.getElementById("cq-stage");
    stage.innerHTML = "";
    self._snoozeVisible = false;

    var status = self._cardStatus(inv);

    // Card container
    var card = document.createElement("div");
    card.className = "cq-card cq-card--" + status;
    card.id = "cq-card";

    // Name
    var name = document.createElement("div");
    name.className = "cq-card__name";
    name.textContent = inv.name || "Unknown";
    card.appendChild(name);

    // Firm
    if (inv.firm) {
      var firm = document.createElement("div");
      firm.className = "cq-card__firm";
      firm.textContent = inv.firm;
      card.appendChild(firm);
    }

    // Badges
    var badges = document.createElement("div");
    badges.className = "cq-card__badges";

    if (inv.stage) {
      var stageBadge = document.createElement("span");
      stageBadge.className = "cq-badge cq-badge--" + self._stageCls(inv.stage);
      stageBadge.textContent = inv.stage;
      badges.appendChild(stageBadge);
    }

    if (inv.tier) {
      var tierBadge = document.createElement("span");
      tierBadge.className = "cq-badge cq-badge--tier-" + (inv.tier || "c").toLowerCase();
      tierBadge.textContent = "Tier " + (inv.tier || "").toUpperCase();
      badges.appendChild(tierBadge);
    }

    card.appendChild(badges);

    // Meta rows
    var meta = document.createElement("div");
    meta.className = "cq-card__meta";

    // Days since contact
    var days = self._daysSince(inv.last_contact || inv.updated_at);
    var daysRow = self._metaRow("Last contact", days === 999 ? "Never" : days + " days ago");
    meta.appendChild(daysRow);

    // Next action placeholder — will be filled async
    var actionRow = self._metaRow("Next action", "Loading...");
    actionRow.id = "cq-action-row";
    meta.appendChild(actionRow);

    card.appendChild(meta);

    // Context
    if (inv.why_good_fit) {
      var ctx = document.createElement("div");
      ctx.className = "cq-card__context";
      var text = inv.why_good_fit;
      if (text.length > 120) text = text.substring(0, 120) + "...";
      ctx.textContent = text;
      card.appendChild(ctx);
    }

    stage.appendChild(card);

    // Load next action async
    self._loadNextAction(inv.id);
  },

  /** Create a meta row */
  _metaRow: function (label, value) {
    var row = document.createElement("div");
    row.className = "cq-card__meta-row";
    var lbl = document.createElement("span");
    lbl.className = "cq-card__meta-label";
    lbl.textContent = label;
    var val = document.createElement("span");
    val.className = "cq-card__meta-value";
    val.textContent = value;
    row.appendChild(lbl);
    row.appendChild(val);
    return row;
  },

  /** Load next pending action for an investor */
  _loadNextAction: function (investorId) {
    CRM.api.get("/actions?investor_id=" + investorId + "&status=pending").then(function (actions) {
      var row = document.getElementById("cq-action-row");
      if (!row) return;
      var val = row.querySelector(".cq-card__meta-value");
      if (!val) return;

      if (!actions || actions.length === 0) {
        val.textContent = "None scheduled";
        return;
      }

      // Sort by due_date ascending, pick first
      actions.sort(function (a, b) {
        var da = a.due_date || a.scheduled_date || "9999";
        var db = b.due_date || b.scheduled_date || "9999";
        return da < db ? -1 : da > db ? 1 : 0;
      });

      var action = actions[0];
      var text = action.description || "Pending action";
      if (action.due_date) {
        text += " (due " + action.due_date + ")";
      }
      val.textContent = text;
      // Store action id for mark-done
      row.setAttribute("data-action-id", action.id);
    }).catch(function () {
      var row = document.getElementById("cq-action-row");
      if (row) {
        var val = row.querySelector(".cq-card__meta-value");
        if (val) val.textContent = "Failed to load";
      }
    });
  },

  /** Render empty state */
  _renderEmpty: function () {
    var stage = document.getElementById("cq-stage");
    stage.innerHTML = "";
    var empty = document.createElement("div");
    empty.className = "cq-empty";
    var text = document.createElement("div");
    text.className = "cq-empty__text";
    text.textContent = "All caught up! No investors to process.";
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
    if (total === 0) {
      bar.style.width = "100%";
      return;
    }
    var pct = ((CRM.cards.currentIndex + 1) / total) * 100;
    bar.style.width = pct + "%";
  },

  /** Update counter text */
  _updateCounter: function () {
    var el = document.getElementById("cq-counter");
    if (!el) return;
    var total = CRM.cards.investors.length;
    if (total === 0) {
      el.textContent = "0 of 0";
      return;
    }
    el.textContent = (CRM.cards.currentIndex + 1) + " of " + total;
  },

  /** Navigate to next card */
  next: function () {
    var self = CRM.cards;
    if (self.currentIndex >= self.investors.length - 1) return;

    var card = document.getElementById("cq-card");
    if (card) {
      card.className = card.className + " cq-card--slide-left";
    }

    setTimeout(function () {
      self.currentIndex++;
      self._renderCard();
      self._updateProgress();
      self._updateCounter();

      var newCard = document.getElementById("cq-card");
      if (newCard) {
        newCard.className = newCard.className + " cq-card--enter-left";
        // Force reflow
        void newCard.offsetWidth;
        newCard.className = newCard.className.replace(" cq-card--enter-left", "");
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

  /** Open investor detail at email section */
  openEmail: function () {
    var inv = CRM.cards.investors[CRM.cards.currentIndex];
    if (inv) {
      window.location.href = "/investor.html?id=" + inv.id + "#email";
    }
  },

  /** Toggle snooze picker */
  toggleSnooze: function () {
    var self = CRM.cards;
    var card = document.getElementById("cq-card");
    if (!card) return;

    if (self._snoozeVisible) {
      var existing = card.querySelector(".cq-snooze");
      if (existing) card.removeChild(existing);
      self._snoozeVisible = false;
      return;
    }

    var inv = self.investors[self.currentIndex];
    if (!inv) return;

    var wrap = document.createElement("div");
    wrap.className = "cq-snooze";

    var label = document.createElement("span");
    label.className = "cq-snooze__label";
    label.textContent = "Snooze until:";
    wrap.appendChild(label);

    var input = document.createElement("input");
    input.type = "date";
    input.className = "cq-snooze__input";
    input.id = "cq-snooze-date";
    // Default: 7 days from now
    var d = new Date();
    d.setDate(d.getDate() + 7);
    input.value = d.toISOString().split("T")[0];
    wrap.appendChild(input);

    var btn = document.createElement("button");
    btn.className = "cq-snooze__btn";
    btn.textContent = "Snooze";
    btn.onclick = function () {
      self._doSnooze(inv.id, input.value);
    };
    wrap.appendChild(btn);

    card.appendChild(wrap);
    self._snoozeVisible = true;
  },

  /** Execute snooze */
  _doSnooze: function (investorId, dateStr) {
    var self = CRM.cards;
    CRM.api.patch("/investors/" + investorId, { snooze_until: dateStr }).then(function () {
      CRM.components.toast("Snoozed until " + dateStr, "info");
      // Update local data
      var inv = self.investors[self.currentIndex];
      if (inv) inv.snooze_until = dateStr;
      // Re-sort and re-render
      self.investors = self._sortInvestors(self.investors);
      // Find current investor's new index or just advance
      self._renderCard();
      self._updateProgress();
      self._updateCounter();
    }).catch(function () {
      CRM.components.toast("Failed to snooze", "error");
    });
  },

  /** Mark top action as done */
  markDone: function () {
    var self = CRM.cards;
    var row = document.getElementById("cq-action-row");
    if (!row) return;
    var actionId = row.getAttribute("data-action-id");
    if (!actionId) {
      CRM.components.toast("No pending action to complete", "info");
      return;
    }

    CRM.api.patch("/actions/" + actionId, { status: "done", completed_at: new Date().toISOString() }).then(function () {
      CRM.components.toast("Action marked done", "success");
      // Reload the action for this card
      var inv = self.investors[self.currentIndex];
      if (inv) self._loadNextAction(inv.id);
    }).catch(function () {
      CRM.components.toast("Failed to update action", "error");
    });
  },

  /** Bind keyboard listeners */
  _bindKeyboard: function () {
    var self = CRM.cards;
    document.addEventListener("keydown", function (e) {
      // Don't capture when typing in inputs
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      switch (e.key) {
        case "ArrowRight":
        case "j":
          e.preventDefault();
          self.next();
          break;
        case "ArrowLeft":
        case "k":
          e.preventDefault();
          self.prev();
          break;
        case "Enter":
          e.preventDefault();
          self.openDetail();
          break;
        case "s":
          e.preventDefault();
          self.toggleSnooze();
          break;
        case "d":
          e.preventDefault();
          self.markDone();
          break;
        case "e":
          e.preventDefault();
          self.openEmail();
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

      // Only start swiping if horizontal movement dominates
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
        // Reset
        if (card) {
          card.style.transform = "";
          card.style.transition = "";
        }
        return;
      }

      if (self._touchDelta > 100) {
        // Swipe right = mark done (green flash)
        card.className = card.className + " cq-card--flash-green";
        setTimeout(function () {
          self.markDone();
          // Advance to next if there's a next
          if (self.currentIndex < self.investors.length - 1) {
            self.next();
          } else {
            card.style.transform = "";
            card.style.transition = "";
            card.className = card.className.replace(" cq-card--flash-green", "");
          }
        }, 300);
      } else if (self._touchDelta < -100) {
        // Swipe left = snooze (amber flash)
        card.className = card.className + " cq-card--flash-amber";
        setTimeout(function () {
          // Quick snooze: 7 days
          var inv = self.investors[self.currentIndex];
          if (inv) {
            var d = new Date();
            d.setDate(d.getDate() + 7);
            self._doSnooze(inv.id, d.toISOString().split("T")[0]);
          }
        }, 300);
      } else {
        // Snap back
        card.style.transform = "";
        card.style.transition = "";
      }

      self._swiping = false;
      self._touchDelta = 0;
    }, { passive: true });
  }
};

// Auto-init when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  CRM.cards.init();
});
