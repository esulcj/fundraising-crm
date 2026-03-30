/**
 * Fundraising CRM — App Shell
 * ES5 JavaScript
 */
(function () {
  "use strict";

  var app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = '<p class="t-body text-muted" style="padding: 24px 0; text-align: center;">Loading...</p>';

  // Health check on load
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/health");
  xhr.onload = function () {
    if (xhr.status === 200) {
      app.innerHTML = '<p class="t-body" style="padding: 24px 0; text-align: center;">Connected</p>';
    } else {
      app.innerHTML = '<p class="t-body text-accent" style="padding: 24px 0; text-align: center;">Error connecting to API</p>';
    }
  };
  xhr.onerror = function () {
    app.innerHTML = '<p class="t-body text-accent" style="padding: 24px 0; text-align: center;">Error connecting to API</p>';
  };
  xhr.send();
})();
