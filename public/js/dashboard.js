/**
 * Fundraising CRM — Dashboard
 * ES5 JavaScript
 */
var CRM = CRM || {};

CRM.dashboard = {
  investors: [],
  interactions: [],
  overdue: [],

  init: function () {
    var container = document.getElementById("dashboard-app");
    if (!container) return;

    CRM.components.loading(container);

    Promise.all([
      CRM.api.get("/investors"),
      CRM.api.get("/interactions"),
      CRM.api.get("/follow-ups/overdue")
    ]).then(function (results) {
      CRM.dashboard.investors = results[0] || [];
      CRM.dashboard.interactions = results[1] || [];
      CRM.dashboard.overdue = results[2] || [];
      CRM.dashboard.render(container);
    }).catch(function (err) {
      CRM.components.errorBanner(container, "Failed to load dashboard: " + err.message, function () {
        CRM.dashboard.init();
      });
    });
  },

  render: function (container) {
    var html = "";

    // Stats bar
    html += CRM.dashboard.renderStats();

    // Quick actions
    html += CRM.dashboard.renderActions();

    // Recent activity
    html += CRM.dashboard.renderRecentActivity();

    // Overdue follow-ups
    html += CRM.dashboard.renderOverdue();

    container.innerHTML = html;
  },

  renderStats: function () {
    var investors = CRM.dashboard.investors;
    var overdue = CRM.dashboard.overdue;

    // Active = not snoozed (snooze_until is null or in the past)
    var now = new Date().toISOString();
    var active = 0;
    var stageCounts = {};
    var i, inv;

    for (i = 0; i < investors.length; i++) {
      inv = investors[i];
      var isSnoozed = inv.snooze_until && inv.snooze_until > now;
      if (!isSnoozed) {
        active++;
      }
      var stage = inv.stage || "lead";
      stageCounts[stage] = (stageCounts[stage] || 0) + 1;
    }

    var overdueCount = overdue.length;
    var overdueClass = overdueCount > 0 ? " dash-stat__number--alert" : "";

    // Today's follow-ups
    var today = new Date().toISOString().slice(0, 10);
    var todayCount = 0;
    for (i = 0; i < overdue.length; i++) {
      if (overdue[i].due_date && overdue[i].due_date.slice(0, 10) === today) {
        todayCount++;
      }
    }

    var html = '<div class="dash-stats">';
    html += '<div class="dash-stat"><div class="dash-stat__number">' + active + '</div><div class="dash-stat__label">Active Investors</div></div>';
    html += '<div class="dash-stat"><div class="dash-stat__number">' + investors.length + '</div><div class="dash-stat__label">Total Investors</div></div>';
    html += '<div class="dash-stat"><div class="dash-stat__number' + overdueClass + '">' + overdueCount + '</div><div class="dash-stat__label">Overdue</div></div>';
    html += '<div class="dash-stat"><div class="dash-stat__number">' + todayCount + '</div><div class="dash-stat__label">Due Today</div></div>';
    html += '</div>';

    // Stage breakdown
    var stages = Object.keys(stageCounts);
    if (stages.length > 0) {
      html += '<div class="dash-stages">';
      for (i = 0; i < stages.length; i++) {
        html += '<span class="dash-stage-tag">' + CRM.dashboard.escapeHtml(stages[i]) + ': ' + stageCounts[stages[i]] + '</span>';
      }
      html += '</div>';
    }

    return html;
  },

  renderActions: function () {
    var html = '<div class="dash-actions">';
    html += '<a href="/cards.html" class="dash-action-btn dash-action-btn--primary">Process Cards</a>';
    html += '<a href="/pipeline.html" class="dash-action-btn dash-action-btn--secondary">View Pipeline</a>';
    html += '</div>';
    return html;
  },

  renderRecentActivity: function () {
    var interactions = CRM.dashboard.interactions;
    var investors = CRM.dashboard.investors;

    // Build investor lookup
    var investorMap = {};
    var i;
    for (i = 0; i < investors.length; i++) {
      investorMap[investors[i].id] = investors[i];
    }

    // Take first 5 (already sorted by created_at DESC from API)
    var recent = interactions.slice(0, 5);

    if (recent.length === 0) {
      return '<div class="dash-section"><h2 class="dash-section__title">Recent Activity</h2><p class="t-caption text-muted" style="padding: 12px 0;">No interactions yet.</p></div>';
    }

    var html = '<div class="dash-section"><h2 class="dash-section__title">Recent Activity</h2><ul class="dash-activity">';

    for (i = 0; i < recent.length; i++) {
      var ix = recent[i];
      var inv = investorMap[ix.investor_id];
      var name = inv ? inv.name : "Unknown";
      var investorId = ix.investor_id || "";
      var type = ix.type || "note";
      var summary = ix.summary || "";
      var date = ix.created_at ? ix.created_at.slice(0, 10) : "";

      html += '<li class="dash-activity__item">';
      html += '<a href="/investor.html?id=' + CRM.dashboard.escapeHtml(investorId) + '" class="dash-activity__name">' + CRM.dashboard.escapeHtml(name) + '</a>';
      html += '<span class="dash-activity__type">' + CRM.dashboard.escapeHtml(type) + '</span>';
      if (summary) {
        html += '<span class="dash-activity__summary">' + CRM.dashboard.escapeHtml(summary) + '</span>';
      }
      html += '<span class="dash-activity__date">' + CRM.dashboard.escapeHtml(date) + '</span>';
      html += '</li>';
    }

    html += '</ul></div>';
    return html;
  },

  renderOverdue: function () {
    var overdue = CRM.dashboard.overdue;
    var investors = CRM.dashboard.investors;

    if (overdue.length === 0) {
      return '';
    }

    var investorMap = {};
    var i;
    for (i = 0; i < investors.length; i++) {
      investorMap[investors[i].id] = investors[i];
    }

    var html = '<div class="dash-section"><h2 class="dash-section__title">Overdue Follow-ups</h2><ul class="dash-overdue">';

    for (i = 0; i < overdue.length; i++) {
      var fu = overdue[i];
      var inv = investorMap[fu.investor_id];
      var name = inv ? inv.name : "Unknown";
      var investorId = fu.investor_id || "";
      var desc = fu.description || "";
      var dueDate = fu.due_date ? fu.due_date.slice(0, 10) : "";

      html += '<li class="dash-overdue__item">';
      html += '<a href="/investor.html?id=' + CRM.dashboard.escapeHtml(investorId) + '" class="dash-activity__name">' + CRM.dashboard.escapeHtml(name) + '</a>';
      html += '<span class="dash-overdue__desc">' + CRM.dashboard.escapeHtml(desc) + '</span>';
      html += '<span class="dash-overdue__date">Due ' + CRM.dashboard.escapeHtml(dueDate) + '</span>';
      html += '</li>';
    }

    html += '</ul></div>';
    return html;
  },

  escapeHtml: function (str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
};

// Auto-init on page load
(function () {
  var path = window.location.pathname;
  if (path === "/" || path === "/index.html") {
    CRM.dashboard.init();
  }
})();
