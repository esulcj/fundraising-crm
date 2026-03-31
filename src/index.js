/**
 * Fundraising CRM — Worker entry point
 * ES5 JavaScript
 */

import { handleInvestors } from "./routes/investors.js";
import { handleContacts } from "./routes/contacts.js";
import { handleInteractions } from "./routes/interactions.js";
import { handleActions } from "./routes/actions.js";
import { handleMaterials } from "./routes/materials.js";
import { handleDdItems } from "./routes/dd-items.js";
import { handleFollowUps } from "./routes/follow-ups.js";
import { handleAgentConfigs } from "./routes/agent-configs.js";
import { handleAgentCorrections } from "./routes/agent-corrections.js";
import { handleAgentExamples } from "./routes/agent-examples.js";
import { handleEmailThreads } from "./routes/email-threads.js";
import { handleEmails } from "./routes/emails.js";
import { handleBriefings } from "./routes/briefings.js";
import { handleTranscripts } from "./routes/transcripts.js";

var routeHandlers = {
  "/api/investors": handleInvestors,
  "/api/contacts": handleContacts,
  "/api/interactions": handleInteractions,
  "/api/actions": handleActions,
  "/api/materials": handleMaterials,
  "/api/dd-items": handleDdItems,
  "/api/follow-ups": handleFollowUps,
  "/api/agent-configs": handleAgentConfigs,
  "/api/agent-corrections": handleAgentCorrections,
  "/api/agent-examples": handleAgentExamples,
  "/api/email-threads": handleEmailThreads,
  "/api/emails": handleEmails,
  "/api/briefings": handleBriefings,
  "/api/transcripts": handleTranscripts
};

function jsonResponse(data, status) {
  status = status || 200;
  return new Response(JSON.stringify(data), {
    status: status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
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
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
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
  // Sort by length descending so longer prefixes match first
  // (e.g., /api/email-threads before /api/emails)
  var prefixes = Object.keys(routeHandlers).sort(function (a, b) {
    return b.length - a.length;
  });
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
