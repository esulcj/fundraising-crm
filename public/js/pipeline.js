/**
 * Fundraising CRM — Pipeline Kanban Board
 * ES5 JavaScript
 */
var CRM = CRM || {};

CRM.pipeline = {
  investors: [],
  actions: [],
  stages: ["Lead", "Intro", "Meeting", "DD", "IC", "Term Sheet", "Closed"],
  stageKeys: ["lead", "intro", "meeting", "dd", "ic", "term_sheet", "closed"],
  filters: { tier: "", source: "", sort: "days" },
  _draggedId: null,

  /** Normalize stage string to a stage key */
  _normalizeStage: function (stage) {
    if (!stage) return "lead";
    var s = stage.toLowerCase().replace(/\s+/g, "_");
    var map = {
      "lead": "lead", "intro": "intro", "meeting": "meeting",
      "dd": "dd", "ic": "ic", "term_sheet": "term_sheet",
      "termsheet": "term_sheet", "closed": "closed"
    };
    return map[s] || "lead";
  },

  /** Get display name for a stage key */
  _stageLabel: function (key) {
    var idx = CRM.pipeline.stageKeys.indexOf(key);
    return idx >= 0 ? CRM.pipeline.stages[idx] : key;
  },

  /** Calculate days since a date string */
  _daysSince: function (dateStr) {
    if (!dateStr) return 0;
    var then = new Date(dateStr);
    var now = new Date();
    var diff = now.getTime() - then.getTime();
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  },

  /** Group investors by stage */
  _groupByStage: function (investors) {
    var groups = {};
    var i;
    for (i = 0; i < CRM.pipeline.stageKeys.length; i++) {
      groups[CRM.pipeline.stageKeys[i]] = [];
    }
    for (i = 0; i < investors.length; i++) {
      var inv = investors[i];
      var key = CRM.pipeline._normalizeStage(inv.stage);
      if (!groups[key]) groups[key] = [];
      groups[key].push(inv);
    }
    return groups;
  },

  /** Filter investors based on current filters */
  _applyFilters: function (investors) {
    var filtered = [];
    var tier = CRM.pipeline.filters.tier;
    var source = CRM.pipeline.filters.source;
    for (var i = 0; i < investors.length; i++) {
      var inv = investors[i];
      if (tier && inv.tier !== tier) continue;
      if (source && inv.intro_source !== source) continue;
      filtered.push(inv);
    }
    return filtered;
  },

  /** Sort investors within a group */
  _sortInvestors: function (list) {
    var sortBy = CRM.pipeline.filters.sort;
    list.sort(function (a, b) {
      if (sortBy === "name") {
        return (a.name || "").localeCompare(b.name || "");
      }
      // Default: days in stage (most days first)
      var daysA = CRM.pipeline._daysSince(a.updated_at);
      var daysB = CRM.pipeline._daysSince(b.updated_at);
      return daysB - daysA;
    });
    return list;
  },

  /** Find next action for an investor */
  _nextAction: function (investorId) {
    for (var i = 0; i < CRM.pipeline.actions.length; i++) {
      var a = CRM.pipeline.actions[i];
      if (a.investor_id === investorId && a.status !== "done") {
        return a.description || a.action_type || "";
      }
    }
    return "";
  },

  /** Populate intro source filter from data */
  _populateSources: function () {
    var sel = document.getElementById("pl-filter-source");
    if (!sel) return;
    var sources = {};
    for (var i = 0; i < CRM.pipeline.investors.length; i++) {
      var s = CRM.pipeline.investors[i].intro_source;
      if (s && !sources[s]) sources[s] = true;
    }
    var keys = Object.keys(sources).sort();
    // Keep first option (All)
    while (sel.options.length > 1) sel.remove(1);
    for (var j = 0; j < keys.length; j++) {
      var opt = document.createElement("option");
      opt.value = keys[j];
      opt.textContent = keys[j];
      sel.appendChild(opt);
    }
  },

  /** Render stats row */
  _renderStats: function (groups) {
    var container = document.getElementById("pl-stats");
    if (!container) return;
    container.innerHTML = "";
    for (var i = 0; i < CRM.pipeline.stageKeys.length; i++) {
      var key = CRM.pipeline.stageKeys[i];
      var list = groups[key] || [];
      var totalDays = 0;
      for (var j = 0; j < list.length; j++) {
        totalDays += CRM.pipeline._daysSince(list[j].updated_at);
      }
      var avg = list.length > 0 ? Math.round(totalDays / list.length) : 0;

      var stat = document.createElement("div");
      stat.className = "pl-stat";

      var count = document.createElement("div");
      count.className = "pl-stat__count";
      count.textContent = list.length;

      var label = document.createElement("div");
      label.className = "pl-stat__label";
      label.textContent = CRM.pipeline._stageLabel(key);

      var avgEl = document.createElement("div");
      avgEl.className = "pl-stat__avg";
      avgEl.textContent = avg + "d avg";

      stat.appendChild(count);
      stat.appendChild(label);
      stat.appendChild(avgEl);
      container.appendChild(stat);
    }
  },

  /** Create a card element */
  _createCard: function (inv) {
    var card = document.createElement("div");
    card.className = "pl-card";
    card.setAttribute("draggable", "true");
    card.setAttribute("data-id", inv.id);

    // Top row: name + tier
    var top = document.createElement("div");
    top.className = "pl-card__top";

    var name = document.createElement("span");
    name.className = "pl-card__name";
    name.textContent = inv.name || "Unknown";

    top.appendChild(name);

    if (inv.tier) {
      var tier = document.createElement("span");
      tier.className = "pl-card__tier pl-card__tier--" + inv.tier;
      tier.textContent = inv.tier;
      top.appendChild(tier);
    }

    card.appendChild(top);

    // Days in stage
    var days = CRM.pipeline._daysSince(inv.updated_at);
    var meta = document.createElement("div");
    meta.className = "pl-card__meta";
    meta.textContent = days + "d in stage";
    if (inv.firm) meta.textContent += " \u00B7 " + inv.firm;
    card.appendChild(meta);

    // Next action
    var action = CRM.pipeline._nextAction(inv.id);
    if (action) {
      var actionEl = document.createElement("div");
      actionEl.className = "pl-card__action";
      actionEl.textContent = action;
      card.appendChild(actionEl);
    }

    // Click to navigate
    card.addEventListener("click", function (e) {
      if (CRM.pipeline._draggedId) return;
      window.location.href = "/investor.html?id=" + inv.id;
    });

    // Drag events
    card.addEventListener("dragstart", function (e) {
      CRM.pipeline._draggedId = inv.id;
      card.classList.add("pl-card--dragging");
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", inv.id);
    });

    card.addEventListener("dragend", function (e) {
      card.classList.remove("pl-card--dragging");
      CRM.pipeline._draggedId = null;
      // Remove all drop-target highlights
      var cols = document.querySelectorAll(".pl-column--drop-target");
      for (var i = 0; i < cols.length; i++) {
        cols[i].classList.remove("pl-column--drop-target");
      }
    });

    return card;
  },

  /** Render the kanban board */
  _renderBoard: function () {
    var board = document.getElementById("pl-board");
    if (!board) return;

    var filtered = CRM.pipeline._applyFilters(CRM.pipeline.investors);
    var groups = CRM.pipeline._groupByStage(filtered);

    // Sort within groups
    for (var k = 0; k < CRM.pipeline.stageKeys.length; k++) {
      var key = CRM.pipeline.stageKeys[k];
      if (groups[key]) {
        CRM.pipeline._sortInvestors(groups[key]);
      }
    }

    CRM.pipeline._renderStats(groups);

    board.innerHTML = "";

    for (var i = 0; i < CRM.pipeline.stageKeys.length; i++) {
      var stageKey = CRM.pipeline.stageKeys[i];
      var stageInvestors = groups[stageKey] || [];

      var col = document.createElement("div");
      col.className = "pl-column pl-column--" + stageKey;
      col.setAttribute("data-stage", stageKey);

      // Header
      var header = document.createElement("div");
      header.className = "pl-column__header";

      var nameEl = document.createElement("span");
      nameEl.className = "pl-column__name";
      nameEl.textContent = CRM.pipeline._stageLabel(stageKey);

      var badge = document.createElement("span");
      badge.className = "pl-column__badge";
      badge.textContent = stageInvestors.length;

      header.appendChild(nameEl);
      header.appendChild(badge);
      col.appendChild(header);

      // Cards container
      var cards = document.createElement("div");
      cards.className = "pl-column__cards";

      for (var j = 0; j < stageInvestors.length; j++) {
        cards.appendChild(CRM.pipeline._createCard(stageInvestors[j]));
      }

      col.appendChild(cards);

      // Column drag events
      (function (column, stage) {
        column.addEventListener("dragover", function (e) {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
          column.classList.add("pl-column--drop-target");
        });

        column.addEventListener("dragleave", function (e) {
          // Only remove if leaving the column entirely
          if (!column.contains(e.relatedTarget)) {
            column.classList.remove("pl-column--drop-target");
          }
        });

        column.addEventListener("drop", function (e) {
          e.preventDefault();
          column.classList.remove("pl-column--drop-target");
          var investorId = e.dataTransfer.getData("text/plain");
          if (!investorId) return;

          // Map stage key to API value
          var stageValue = CRM.pipeline._stageLabel(stage).toLowerCase();
          if (stage === "term_sheet") stageValue = "term_sheet";

          CRM.api.patch("/investors/" + investorId, { stage: stageValue }).then(function () {
            // Update local data
            for (var idx = 0; idx < CRM.pipeline.investors.length; idx++) {
              if (CRM.pipeline.investors[idx].id === investorId) {
                CRM.pipeline.investors[idx].stage = stageValue;
                CRM.pipeline.investors[idx].updated_at = new Date().toISOString();
                break;
              }
            }
            CRM.pipeline._renderBoard();
            CRM.components.toast("Moved to " + CRM.pipeline._stageLabel(stage), "success");
          }).catch(function (err) {
            CRM.components.toast("Failed to update: " + (err.message || "Unknown error"), "error");
          });
        });
      })(col, stageKey);

      board.appendChild(col);
    }
  },

  /** Initialize pipeline */
  init: function () {
    var board = document.getElementById("pl-board");
    if (!board) return;

    CRM.components.loading(board);

    // Fetch investors and actions in parallel
    var investorsP = CRM.api.get("/investors");
    var actionsP = CRM.api.get("/actions").catch(function () { return []; });

    Promise.all([investorsP, actionsP]).then(function (results) {
      CRM.pipeline.investors = results[0] || [];
      CRM.pipeline.actions = results[1] || [];

      CRM.pipeline._populateSources();
      CRM.pipeline._renderBoard();
    }).catch(function (err) {
      CRM.components.errorBanner(board, "Failed to load pipeline: " + (err.message || "Unknown error"), function () {
        CRM.pipeline.init();
      });
    });

    // Bind filter events
    var tierSel = document.getElementById("pl-filter-tier");
    var sourceSel = document.getElementById("pl-filter-source");
    var sortSel = document.getElementById("pl-filter-sort");

    if (tierSel) {
      tierSel.addEventListener("change", function () {
        CRM.pipeline.filters.tier = this.value;
        CRM.pipeline._renderBoard();
      });
    }
    if (sourceSel) {
      sourceSel.addEventListener("change", function () {
        CRM.pipeline.filters.source = this.value;
        CRM.pipeline._renderBoard();
      });
    }
    if (sortSel) {
      sortSel.addEventListener("change", function () {
        CRM.pipeline.filters.sort = this.value;
        CRM.pipeline._renderBoard();
      });
    }
  }
};

// Auto-init on DOM ready
document.addEventListener("DOMContentLoaded", function () {
  CRM.pipeline.init();
});
