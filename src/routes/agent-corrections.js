/**
 * Agent Corrections CRUD routes
 * ES5 JavaScript
 */
import { dbAll, dbFirst, dbRun } from "../db/helpers.js";

function handleAgentCorrections(request, env, ctx) {
  var url = new URL(request.url);
  var method = request.method;
  var path = url.pathname.replace("/api/agent-corrections", "");
  var db = env.DB;

  if (path === "" || path === "/") {
    if (method === "GET") { return listAgentCorrections(db, url); }
    if (method === "POST") { return createAgentCorrection(db, request); }
  }

  var id = path.replace("/", "");
  if (!id) { return errorJson("Not found", 404); }

  if (method === "GET") { return getAgentCorrection(db, id); }
  if (method === "PUT") { return updateAgentCorrection(db, id, request); }
  if (method === "PATCH") { return patchAgentCorrection(db, id, request); }
  if (method === "DELETE") { return deleteAgentCorrection(db, id); }

  return errorJson("Method not allowed", 405);
}

function listAgentCorrections(db, url) {
  var sql = "SELECT * FROM agent_corrections WHERE 1=1";
  var params = [];
  var agentType = url.searchParams.get("agent_type");
  if (agentType) { sql += " AND agent_type = ?"; params.push(agentType); }
  sql += " ORDER BY created_at DESC";
  return dbAll(db, sql, params).then(function (rows) { return jsonRes(rows); });
}

function getAgentCorrection(db, id) {
  return dbFirst(db, "SELECT * FROM agent_corrections WHERE id = ?", [id]).then(function (row) {
    if (!row) { return errorJson("Not found", 404); }
    return jsonRes(row);
  });
}

function createAgentCorrection(db, request) {
  return request.json().then(function (body) {
    if (!body.agent_type) { return errorJson("agent_type is required", 400); }
    var sql = "INSERT INTO agent_corrections (id, agent_type, input_context, original_output, corrected_output, pinned) VALUES (hex(randomblob(8)), ?, ?, ?, ?, ?)";
    var params = [body.agent_type, body.input_context || null, body.original_output || null, body.corrected_output || null, body.pinned || 0];
    return dbRun(db, sql, params).then(function () {
      return dbFirst(db, "SELECT * FROM agent_corrections WHERE rowid = last_insert_rowid()").then(function (row) { return jsonRes(row, 201); });
    });
  });
}

function updateAgentCorrection(db, id, request) {
  return request.json().then(function (body) {
    if (!body.agent_type) { return errorJson("agent_type is required", 400); }
    var sql = "UPDATE agent_corrections SET agent_type=?, input_context=?, original_output=?, corrected_output=?, pinned=? WHERE id=?";
    var params = [body.agent_type, body.input_context || null, body.original_output || null, body.corrected_output || null, body.pinned || 0, id];
    return dbRun(db, sql, params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM agent_corrections WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function patchAgentCorrection(db, id, request) {
  return request.json().then(function (body) {
    var fields = [];
    var params = [];
    var allowed = ["agent_type","input_context","original_output","corrected_output","pinned"];
    for (var i = 0; i < allowed.length; i++) {
      if (body.hasOwnProperty(allowed[i])) {
        fields.push(allowed[i] + "=?");
        params.push(body[allowed[i]]);
      }
    }
    if (fields.length === 0) { return errorJson("No valid fields to update", 400); }
    params.push(id);
    return dbRun(db, "UPDATE agent_corrections SET " + fields.join(", ") + " WHERE id=?", params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM agent_corrections WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function deleteAgentCorrection(db, id) {
  return dbRun(db, "DELETE FROM agent_corrections WHERE id = ?", [id]).then(function (result) {
    if (result.meta.changes === 0) { return errorJson("Not found", 404); }
    return jsonRes({ deleted: true });
  });
}

function jsonRes(data, status) {
  status = status || 200;
  return new Response(JSON.stringify(data), { status: status, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
}

function errorJson(message, status) { return jsonRes({ error: message }, status || 500); }

export { handleAgentCorrections };
