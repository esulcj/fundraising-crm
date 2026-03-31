/**
 * Fundraising CRM — App Shell
 * ES5 JavaScript
 *
 * Page routing: each page includes its own JS and self-initializes.
 * This file provides shared utilities and fallback loading state.
 */
(function () {
  "use strict";

  var path = window.location.pathname;

  // Dashboard is handled by dashboard.js (auto-inits on / or /index.html)
  // Cards is handled by cards.js
  // Investor detail is handled by investor.js
  // Each page includes its own scripts via <script> tags

  // Fallback: if no page-specific JS loaded, show health check
  var app = document.getElementById("app");
  if (app && path !== "/" && path !== "/index.html") {
    app.innerHTML = '<p class="t-body text-muted" style="padding: 24px 0; text-align: center;">Loading...</p>';

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
  }
})();
