/**
 * Fundraising CRM — API Client
 * ES5 JavaScript
 */
var CRM = CRM || {};

CRM.api = {
  baseUrl: "/api",

  /**
   * Core fetch with JSON headers, retry on 5xx.
   * @param {string} method
   * @param {string} path
   * @param {*} [body]
   * @returns {Promise}
   */
  request: function (method, path, body) {
    var url = CRM.api.baseUrl + path;
    var maxRetries = 3;
    var delays = [1000, 2000, 4000];

    function attempt(retryCount) {
      var opts = {
        method: method,
        headers: { "Content-Type": "application/json" }
      };
      if (body !== undefined && body !== null) {
        opts.body = JSON.stringify(body);
      }
      return fetch(url, opts).then(function (res) {
        if (res.ok) {
          return res.json().catch(function () { return null; });
        }
        if (res.status >= 500 && retryCount < maxRetries) {
          return new Promise(function (resolve) {
            setTimeout(function () {
              resolve(attempt(retryCount + 1));
            }, delays[retryCount]);
          });
        }
        return res.json().catch(function () {
          return { message: res.statusText };
        }).then(function (errBody) {
          var err = new Error(errBody.message || "Request failed");
          err.status = res.status;
          err.message = errBody.message || "Request failed";
          throw err;
        });
      });
    }

    return attempt(0);
  },

  get: function (path) {
    return CRM.api.request("GET", path);
  },

  post: function (path, body) {
    return CRM.api.request("POST", path, body);
  },

  put: function (path, body) {
    return CRM.api.request("PUT", path, body);
  },

  patch: function (path, body) {
    return CRM.api.request("PATCH", path, body);
  },

  del: function (path) {
    return CRM.api.request("DELETE", path);
  }
};
