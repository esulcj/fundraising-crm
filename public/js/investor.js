/**
 * Fundraising CRM — Investor Detail Page
 * ES5 JavaScript
 */
var CRM = CRM || {};

CRM.investor = {
  investorId: null,
  data: {},

  init: function () {
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    if (!id) {
      var app = document.getElementById("investor-app");
      if (app) {
        CRM.components.errorBanner(app, "No investor ID provided.");
      }
      return;
    }
    CRM.investor.investorId = id;
    var app = document.getElementById("investor-app");
    if (app) {
      CRM.components.loading(app);
    }
    CRM.investor.loadAll();
  },

  loadAll: function () {
    var id = CRM.investor.investorId;
    var fetches = [
      CRM.api.get("/investors/" + id),
      CRM.api.get("/contacts?investor_id=" + id),
      CRM.api.get("/interactions?investor_id=" + id),
      CRM.api.get("/actions?investor_id=" + id),
      CRM.api.get("/materials?investor_id=" + id),
      CRM.api.get("/dd-items?investor_id=" + id),
      CRM.api.get("/follow-ups?investor_id=" + id)
    ];

    Promise.all(fetches).then(function (results) {
      CRM.investor.data.investor = results[0];
      CRM.investor.data.contacts = results[1] || [];
      CRM.investor.data.interactions = results[2] || [];
      CRM.investor.data.actions = results[3] || [];
      CRM.investor.data.materials = results[4] || [];
      CRM.investor.data.ddItems = results[5] || [];
      CRM.investor.data.followUps = results[6] || [];
      CRM.investor.render();
    }).catch(function (err) {
      var app = document.getElementById("investor-app");
      if (app) {
        CRM.components.errorBanner(app, err.message || "Failed to load investor.", function () {
          CRM.investor.loadAll();
        });
      }
    });
  },

  render: function () {
    var app = document.getElementById("investor-app");
    if (!app) return;
    app.innerHTML = "";

    var inv = CRM.investor.data.investor;

    // Header
    var header = CRM.investor.renderHeader(inv);
    app.appendChild(header);

    // Two-column layout
    var layout = document.createElement("div");
    layout.className = "investor-layout";

    var colLeft = document.createElement("div");
    colLeft.className = "investor-col-left";

    var colRight = document.createElement("div");
    colRight.className = "investor-col-right";

    // Left column sections
    colLeft.appendChild(CRM.investor.renderInfo(inv));
    colLeft.appendChild(CRM.investor.renderContacts());
    colLeft.appendChild(CRM.investor.renderTimeline());
    colLeft.appendChild(CRM.investor.renderActions());
    colLeft.appendChild(CRM.investor.renderFollowUps());

    // Right column sections
    colRight.appendChild(CRM.investor.renderEmailDraft());
    colRight.appendChild(CRM.investor.renderDDItems());
    colRight.appendChild(CRM.investor.renderMaterials());

    layout.appendChild(colLeft);
    layout.appendChild(colRight);
    app.appendChild(layout);
  },

  /* ── Header ───────────────────────────────────── */
  renderHeader: function (inv) {
    var header = document.createElement("div");
    header.className = "investor-header";

    var top = document.createElement("div");
    top.className = "investor-header__top";

    var name = document.createElement("span");
    name.className = "investor-header__name";
    name.textContent = inv.name || "Unknown";
    top.appendChild(name);

    if (inv.firm) {
      var firm = document.createElement("span");
      firm.className = "investor-header__firm";
      firm.textContent = inv.firm;
      top.appendChild(firm);
    }

    if (inv.tier) {
      var tierBadge = document.createElement("span");
      tierBadge.className = "badge badge--tier-" + (inv.tier || "3");
      tierBadge.textContent = "Tier " + inv.tier;
      top.appendChild(tierBadge);
    }

    // Stage dropdown
    var stageSelect = document.createElement("select");
    stageSelect.className = "stage-select";
    var stages = ["lead", "contacted", "meeting", "dd", "term_sheet", "committed", "passed"];
    for (var i = 0; i < stages.length; i++) {
      var opt = document.createElement("option");
      opt.value = stages[i];
      opt.textContent = stages[i].replace(/_/g, " ");
      if (stages[i] === inv.stage) {
        opt.selected = true;
      }
      stageSelect.appendChild(opt);
    }
    stageSelect.onchange = function () {
      CRM.api.patch("/investors/" + CRM.investor.investorId, { stage: stageSelect.value }).then(function (updated) {
        CRM.investor.data.investor = updated;
        CRM.components.toast("Stage updated to " + stageSelect.value.replace(/_/g, " "), "success");
      }).catch(function (err) {
        CRM.components.toast("Failed to update stage", "error");
      });
    };
    top.appendChild(stageSelect);

    header.appendChild(top);
    return header;
  },

  /* ── Info Section ─────────────────────────────── */
  renderInfo: function (inv) {
    var section = CRM.investor.createSection("Info");
    var grid = document.createElement("div");
    grid.className = "info-grid";

    var fields = [
      { label: "Fund Size", value: inv.fund_size },
      { label: "HQ", value: inv.hq },
      { label: "Thesis", value: inv.thesis },
      { label: "Why Good Fit", value: inv.why_good_fit },
      { label: "Intro Source", value: inv.intro_source },
      { label: "Intro Person", value: inv.intro_person }
    ];

    for (var i = 0; i < fields.length; i++) {
      if (fields[i].value) {
        var item = document.createElement("div");
        item.className = "info-item";
        var label = document.createElement("div");
        label.className = "info-item__label";
        label.textContent = fields[i].label;
        var value = document.createElement("div");
        value.className = "info-item__value";
        value.textContent = fields[i].value;
        item.appendChild(label);
        item.appendChild(value);
        grid.appendChild(item);
      }
    }

    section.bodyEl.appendChild(grid);
    return section.el;
  },

  /* ── Contacts ─────────────────────────────────── */
  renderContacts: function () {
    var section = CRM.investor.createSection("Contacts");
    var contacts = CRM.investor.data.contacts;

    if (!contacts || contacts.length === 0) {
      var empty = document.createElement("div");
      empty.className = "inv-empty";
      empty.textContent = "No contacts yet.";
      section.bodyEl.appendChild(empty);
      return section.el;
    }

    var table = document.createElement("table");
    table.className = "contacts-table";
    var thead = document.createElement("thead");
    var headerRow = document.createElement("tr");
    var cols = ["Name", "Title", "Email", "Role", ""];
    for (var c = 0; c < cols.length; c++) {
      var th = document.createElement("th");
      th.textContent = cols[c];
      headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    for (var i = 0; i < contacts.length; i++) {
      var tr = document.createElement("tr");
      var tdName = document.createElement("td");
      tdName.textContent = contacts[i].name || "";
      var tdTitle = document.createElement("td");
      tdTitle.textContent = contacts[i].title || "";
      var tdEmail = document.createElement("td");
      tdEmail.textContent = contacts[i].email || "";
      var tdRole = document.createElement("td");
      if (contacts[i].role) {
        var roleBadge = document.createElement("span");
        roleBadge.className = "role-badge role-badge--" + contacts[i].role;
        roleBadge.textContent = contacts[i].role.replace(/_/g, " ");
        tdRole.appendChild(roleBadge);
      }
      var tdPrimary = document.createElement("td");
      if (contacts[i].is_primary) {
        var star = document.createElement("span");
        star.className = "primary-star";
        star.textContent = "\u2605";
        tdPrimary.appendChild(star);
      }
      tr.appendChild(tdName);
      tr.appendChild(tdTitle);
      tr.appendChild(tdEmail);
      tr.appendChild(tdRole);
      tr.appendChild(tdPrimary);
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    section.bodyEl.appendChild(table);
    return section.el;
  },

  /* ── Timeline ─────────────────────────────────── */
  renderTimeline: function () {
    var section = CRM.investor.createSection("Interaction Timeline");
    var interactions = CRM.investor.data.interactions;

    if (!interactions || interactions.length === 0) {
      var empty = document.createElement("div");
      empty.className = "inv-empty";
      empty.textContent = "No interactions yet.";
      section.bodyEl.appendChild(empty);
      return section.el;
    }

    // Sort by date desc
    interactions.sort(function (a, b) {
      return (b.created_at || "").localeCompare(a.created_at || "");
    });

    var timeline = document.createElement("div");
    timeline.className = "timeline";

    for (var i = 0; i < interactions.length; i++) {
      var entry = CRM.investor.renderTimelineEntry(interactions[i]);
      timeline.appendChild(entry);
    }

    section.bodyEl.appendChild(timeline);
    return section.el;
  },

  renderTimelineEntry: function (interaction) {
    var entry = document.createElement("div");
    entry.className = "timeline-entry";

    var dot = document.createElement("div");
    dot.className = "timeline-entry__dot";
    entry.appendChild(dot);

    var header = document.createElement("div");
    header.className = "timeline-entry__header";

    var date = document.createElement("span");
    date.className = "timeline-entry__date";
    date.textContent = CRM.investor.formatDate(interaction.created_at);
    header.appendChild(date);

    if (interaction.type) {
      var type = document.createElement("span");
      type.className = "timeline-entry__type";
      type.textContent = interaction.type;
      header.appendChild(type);
    }

    var summary = document.createElement("span");
    summary.className = "timeline-entry__summary";
    summary.textContent = interaction.summary || "No summary";
    header.appendChild(summary);

    entry.appendChild(header);

    // Detail (expandable)
    var hasDetail = interaction.transcript_raw || interaction.transcript_extracted || interaction.notes;
    if (hasDetail) {
      var detail = document.createElement("div");
      detail.className = "timeline-entry__detail";
      var detailText = interaction.transcript_extracted || interaction.transcript_raw || interaction.notes || "";
      detail.textContent = detailText;
      entry.appendChild(detail);

      header.onclick = function (ent) {
        return function () {
          ent.classList.toggle("timeline-entry--expanded");
        };
      }(entry);
    }

    return entry;
  },

  /* ── Actions ──────────────────────────────────── */
  renderActions: function () {
    var section = CRM.investor.createSection("Actions");
    var actions = CRM.investor.data.actions;

    var list = document.createElement("ul");
    list.className = "action-list";

    if (actions && actions.length > 0) {
      for (var i = 0; i < actions.length; i++) {
        list.appendChild(CRM.investor.renderActionItem(actions[i], list));
      }
    } else {
      var empty = document.createElement("div");
      empty.className = "inv-empty";
      empty.textContent = "No actions yet.";
      list.appendChild(empty);
    }

    section.bodyEl.appendChild(list);

    // Add action form
    var form = document.createElement("div");
    form.className = "add-action-form";

    var descInput = document.createElement("input");
    descInput.type = "text";
    descInput.placeholder = "New action...";

    var dateInput = document.createElement("input");
    dateInput.type = "date";

    var addBtn = document.createElement("button");
    addBtn.className = "btn btn--primary";
    addBtn.textContent = "Add";
    addBtn.onclick = function () {
      var desc = descInput.value.trim();
      if (!desc) return;
      CRM.api.post("/actions", {
        investor_id: CRM.investor.investorId,
        description: desc,
        due_date: dateInput.value || null
      }).then(function (newAction) {
        CRM.investor.data.actions.unshift(newAction);
        // Remove empty message if present
        var emptyEl = list.querySelector(".inv-empty");
        if (emptyEl) emptyEl.parentNode.removeChild(emptyEl);
        list.insertBefore(CRM.investor.renderActionItem(newAction, list), list.firstChild);
        descInput.value = "";
        dateInput.value = "";
        CRM.components.toast("Action added", "success");
      }).catch(function () {
        CRM.components.toast("Failed to add action", "error");
      });
    };

    form.appendChild(descInput);
    form.appendChild(dateInput);
    form.appendChild(addBtn);
    section.bodyEl.appendChild(form);

    return section.el;
  },

  renderActionItem: function (action, list) {
    var li = document.createElement("li");
    li.className = "action-item";
    if (action.status === "done") {
      li.className += " action-item--done";
    }

    var check = document.createElement("input");
    check.type = "checkbox";
    check.className = "action-item__check";
    check.checked = action.status === "done";
    check.onchange = function () {
      var newStatus = check.checked ? "done" : "pending";
      CRM.api.patch("/actions/" + action.id, { status: newStatus, completed_at: check.checked ? new Date().toISOString() : null }).then(function (updated) {
        action.status = updated.status;
        if (updated.status === "done") {
          li.className = "action-item action-item--done";
        } else {
          li.className = "action-item";
        }
        CRM.components.toast("Action marked " + newStatus, "success");
      }).catch(function () {
        check.checked = !check.checked;
        CRM.components.toast("Failed to update action", "error");
      });
    };

    var text = document.createElement("span");
    text.className = "action-item__text";
    text.textContent = action.description || "";

    li.appendChild(check);
    li.appendChild(text);

    if (action.due_date) {
      var due = document.createElement("span");
      due.className = "action-item__due";
      var today = new Date().toISOString().slice(0, 10);
      if (action.status !== "done" && action.due_date < today) {
        due.className += " action-item__due--overdue";
      }
      due.textContent = CRM.investor.formatDate(action.due_date);
      li.appendChild(due);
    }

    return li;
  },

  /* ── Follow-ups ───────────────────────────────── */
  renderFollowUps: function () {
    var section = CRM.investor.createSection("Follow-ups");
    var followUps = CRM.investor.data.followUps;

    if (!followUps || followUps.length === 0) {
      var empty = document.createElement("div");
      empty.className = "inv-empty";
      empty.textContent = "No follow-ups scheduled.";
      section.bodyEl.appendChild(empty);
      return section.el;
    }

    var list = document.createElement("ul");
    list.className = "followup-list";

    var today = new Date().toISOString().slice(0, 10);
    for (var i = 0; i < followUps.length; i++) {
      var fu = followUps[i];
      var li = document.createElement("li");
      li.className = "followup-item";

      var dateSp = document.createElement("span");
      dateSp.className = "followup-item__date";
      if (fu.status !== "done" && fu.due_date && fu.due_date < today) {
        dateSp.className += " followup-item__date--overdue";
      }
      dateSp.textContent = CRM.investor.formatDate(fu.due_date);

      var desc = document.createElement("span");
      desc.className = "followup-item__desc";
      desc.textContent = fu.description || "";

      li.appendChild(dateSp);
      li.appendChild(desc);
      list.appendChild(li);
    }

    section.bodyEl.appendChild(list);
    return section.el;
  },

  /* ── DD Items (right column) ──────────────────── */
  renderDDItems: function () {
    var section = CRM.investor.createSection("Due Diligence");
    var items = CRM.investor.data.ddItems;

    if (!items || items.length === 0) {
      var empty = document.createElement("div");
      empty.className = "inv-empty";
      empty.textContent = "No DD items yet.";
      section.bodyEl.appendChild(empty);
      return section.el;
    }

    var list = document.createElement("ul");
    list.className = "dd-list";

    for (var i = 0; i < items.length; i++) {
      var dd = items[i];
      var li = document.createElement("li");
      li.className = "dd-item";

      var header = document.createElement("div");
      header.className = "dd-item__header";

      var question = document.createElement("span");
      question.className = "dd-item__question";
      question.textContent = dd.question || "";

      var statusBadge = document.createElement("span");
      statusBadge.className = "dd-item__status dd-item__status--" + (dd.status || "asked");
      statusBadge.textContent = (dd.status || "asked").replace(/_/g, " ");

      header.appendChild(question);
      header.appendChild(statusBadge);
      li.appendChild(header);

      if (dd.answer) {
        var answer = document.createElement("div");
        answer.className = "dd-item__answer";
        answer.textContent = dd.answer;
        li.appendChild(answer);

        header.onclick = (function (item) {
          return function () {
            item.classList.toggle("dd-item--expanded");
          };
        })(li);
      }

      list.appendChild(li);
    }

    section.bodyEl.appendChild(list);
    return section.el;
  },

  /* ── Materials (right column) ─────────────────── */
  renderMaterials: function () {
    var section = CRM.investor.createSection("Materials");
    var materials = CRM.investor.data.materials;

    if (!materials || materials.length === 0) {
      var empty = document.createElement("div");
      empty.className = "inv-empty";
      empty.textContent = "No materials shared.";
      section.bodyEl.appendChild(empty);
      return section.el;
    }

    var list = document.createElement("ul");
    list.className = "materials-list";

    for (var i = 0; i < materials.length; i++) {
      var mat = materials[i];
      var li = document.createElement("li");
      li.className = "materials-item";

      var name = document.createElement("span");
      name.className = "materials-item__name";
      name.textContent = mat.name || mat.type || "Untitled";

      li.appendChild(name);

      if (mat.version || mat.deck_version) {
        var version = document.createElement("span");
        version.className = "materials-item__version";
        version.textContent = "v" + (mat.version || mat.deck_version);
        li.appendChild(version);
      }

      if (mat.date_shared) {
        var dateSp = document.createElement("span");
        dateSp.className = "materials-item__date";
        dateSp.textContent = CRM.investor.formatDate(mat.date_shared);
        li.appendChild(dateSp);
      }

      list.appendChild(li);
    }

    section.bodyEl.appendChild(list);
    return section.el;
  },

  /* ── Email Draft (right column) ───────────────── */
  renderEmailDraft: function () {
    var section = CRM.investor.createSection("Email Draft");

    var textarea = document.createElement("textarea");
    textarea.className = "email-draft__textarea";
    textarea.placeholder = "Compose email draft here...\n\nAI-assisted drafting coming soon.";

    var actions = document.createElement("div");
    actions.className = "email-draft__actions";

    var copyBtn = document.createElement("button");
    copyBtn.className = "btn btn--secondary";
    copyBtn.textContent = "Copy to Clipboard";
    copyBtn.onclick = function () {
      var text = textarea.value;
      if (!text) {
        CRM.components.toast("Nothing to copy", "info");
        return;
      }
      // Try modern API first, fall back to execCommand
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          CRM.components.toast("Copied to clipboard", "success");
        }).catch(function () {
          CRM.investor.copyFallback(text);
        });
      } else {
        CRM.investor.copyFallback(text);
      }
    };

    actions.appendChild(copyBtn);
    section.bodyEl.appendChild(textarea);
    section.bodyEl.appendChild(actions);
    return section.el;
  },

  copyFallback: function (text) {
    var temp = document.createElement("textarea");
    temp.value = text;
    temp.style.position = "fixed";
    temp.style.left = "-9999px";
    document.body.appendChild(temp);
    temp.select();
    try {
      document.execCommand("copy");
      CRM.components.toast("Copied to clipboard", "success");
    } catch (e) {
      CRM.components.toast("Failed to copy", "error");
    }
    document.body.removeChild(temp);
  },

  /* ── Helpers ──────────────────────────────────── */
  createSection: function (title) {
    var section = document.createElement("div");
    section.className = "inv-section";

    var heading = document.createElement("div");
    heading.className = "inv-section__heading";
    heading.textContent = title;
    heading.onclick = function () {
      section.classList.toggle("inv-section--collapsed");
    };

    var body = document.createElement("div");
    body.className = "inv-section__body";

    section.appendChild(heading);
    section.appendChild(body);

    return { el: section, bodyEl: body };
  },

  formatDate: function (dateStr) {
    if (!dateStr) return "";
    var d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  }
};

// Initialize on DOM ready
(function () {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", CRM.investor.init);
  } else {
    CRM.investor.init();
  }
})();
