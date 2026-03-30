/**
 * Fundraising CRM — UI Components
 * ES5 JavaScript
 */
var CRM = CRM || {};

CRM.components = {
  /**
   * Render pulsing skeleton card placeholders.
   * @param {Element} container
   * @param {number} count
   * @returns {Element}
   */
  skeleton: function (container, count) {
    var wrap = document.createElement("div");
    wrap.className = "skeleton-wrap";
    var i, card, line1, line2, line3;
    for (i = 0; i < count; i++) {
      card = document.createElement("div");
      card.className = "skeleton-card";
      line1 = document.createElement("div");
      line1.className = "skeleton-line skeleton-line--title";
      line2 = document.createElement("div");
      line2.className = "skeleton-line skeleton-line--body";
      line3 = document.createElement("div");
      line3.className = "skeleton-line skeleton-line--body skeleton-line--short";
      card.appendChild(line1);
      card.appendChild(line2);
      card.appendChild(line3);
      wrap.appendChild(card);
    }
    container.innerHTML = "";
    container.appendChild(wrap);
    return wrap;
  },

  /**
   * Red error banner with optional retry button.
   * @param {Element} container
   * @param {string} message
   * @param {Function} [retryFn]
   * @returns {Element}
   */
  errorBanner: function (container, message, retryFn) {
    var banner = document.createElement("div");
    banner.className = "error-banner";
    var text = document.createElement("span");
    text.className = "error-banner__text";
    text.textContent = message;
    banner.appendChild(text);
    if (typeof retryFn === "function") {
      var btn = document.createElement("button");
      btn.className = "retry-btn error-banner__retry";
      btn.textContent = "Retry";
      btn.onclick = function () { retryFn(); };
      banner.appendChild(btn);
    }
    container.innerHTML = "";
    container.appendChild(banner);
    return banner;
  },

  /**
   * Centered loading spinner.
   * @param {Element} container
   * @returns {Element}
   */
  loading: function (container) {
    var wrap = document.createElement("div");
    wrap.className = "loading-spinner-wrap";
    var spinner = document.createElement("div");
    spinner.className = "loading-spinner";
    wrap.appendChild(spinner);
    container.innerHTML = "";
    container.appendChild(wrap);
    return wrap;
  },

  /**
   * Brief notification toast, auto-dismiss 3s.
   * @param {string} message
   * @param {string} type — "success", "error", or "info"
   * @returns {Element}
   */
  toast: function (message, type) {
    var el = document.createElement("div");
    el.className = "toast toast--" + (type || "info");
    el.textContent = message;
    document.body.appendChild(el);
    // Trigger slide-in on next frame
    setTimeout(function () { el.classList.add("toast--visible"); }, 10);
    setTimeout(function () {
      el.classList.remove("toast--visible");
      el.classList.add("toast--fade");
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 300);
    }, 3000);
    return el;
  },

  /**
   * Empty state with message.
   * @param {Element} container
   * @param {string} message
   * @returns {Element}
   */
  empty: function (container, message) {
    var el = document.createElement("div");
    el.className = "empty-state";
    var text = document.createElement("p");
    text.className = "empty-state__text";
    text.textContent = message;
    el.appendChild(text);
    container.innerHTML = "";
    container.appendChild(el);
    return el;
  },

  /**
   * Standalone retry button.
   * @param {Element} container
   * @param {Function} fn
   * @returns {Element}
   */
  retryButton: function (container, fn) {
    var btn = document.createElement("button");
    btn.className = "retry-btn";
    btn.textContent = "Retry";
    btn.onclick = function () { fn(); };
    container.innerHTML = "";
    container.appendChild(btn);
    return btn;
  }
};
