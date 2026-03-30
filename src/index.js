/**
 * Fundraising CRM — Worker entry point
 * ES5 JavaScript
 */

var routeHandlers = {};

function jsonResponse(data, status) {
  status = status || 200;
  return new Response(JSON.stringify(data), {
    status: status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}

function errorResponse(message, status) {
  status = status || 500;
  return jsonResponse({ error: message }, status);
}

function corsPreflightResponse() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400"
    }
  });
}

function handleHealth() {
  return jsonResponse({ status: "ok", timestamp: Date.now() });
}

function matchRoute(pathname, method, env) {
  if (pathname === "/api/health" && method === "GET") {
    return handleHealth;
  }

  // Route registration: match prefix and delegate
  var prefixes = Object.keys(routeHandlers);
  for (var i = 0; i < prefixes.length; i++) {
    if (pathname.indexOf(prefixes[i]) === 0) {
      return routeHandlers[prefixes[i]];
    }
  }

  return null;
}

var worker = {
  fetch: function (request, env, ctx) {
    var url = new URL(request.url);
    var pathname = url.pathname;
    var method = request.method;

    if (method === "OPTIONS") {
      return corsPreflightResponse();
    }

    var handler = matchRoute(pathname, method, env);
    if (!handler) {
      return errorResponse("Not found", 404);
    }

    try {
      return handler(request, env, ctx);
    } catch (err) {
      return errorResponse("Internal server error: " + (err.message || "unknown"), 500);
    }
  }
};

export default worker;
