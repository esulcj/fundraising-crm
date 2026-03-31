/**
 * Agent Examples CRUD routes
 * ES5 JavaScript
 */
import { dbAll, dbFirst, dbRun } from "../db/helpers.js";

function handleAgentExamples(request, env, ctx) {
  var url = new URL(request.url);
  var method = request.method;
  var path = url.pathname.replace("/api/agent-examples", "");
  var db = env.DB;

  if (path === "" || path === "/") {
    if (method === "GET") { return listAgentExamples(db, url); }
    if (method === "POST") { return createAgentExample(db, request); }
  }

  var id = path.replace("/", "");
  if (!id) { return errorJson("Not found", 404); }

  if (method === "GET") { return getAgentExample(db, id); }
  if (method === "PUT") { return updateAgentExample(db, id, request); }
  if (method === "PATCH") { return patchAgentExample(db, id, request); }
  if (method === "DELETE") { return deleteAgentExample(db, id); }

  return errorJson("Method not allowed", 405);
}

function listAgentExamples(db, url) {
  var sql = "SELECT * FROM agent_examples WHERE 1=1";
  var params = [];
  var agentType = url.searchParams.get("agent_type");
  if (agentType) { sql += " AND agent_type = ?"; params.push(agentType); }
  sql += " ORDER BY created_at DESC";
  return dbAll(db, sql, params).then(function (rows) { return jsonRes(rows); });
}

function getAgentExample(db, id) {
  return dbFirst(db, "SELECT * FROM agent_examples WHERE id = ?", [id]).then(function (row) {
    if (!row) { return errorJson("Not found", 404); }
    return jsonRes(row);
  });
}

function createAgentExample(db, request) {
  return request.json().then(function (body) {
    if (!body.agent_type) { return errorJson("agent_type is required", 400); }
    var sql = "INSERT INTO agent_examples (id, agent_type, input, output, active) VALUES (hex(randomblob(8)), ?, ?, ?, ?)";
    var params = [body.agent_type, body.input || null, body.output || null, body.active !== undefined ? body.active : 1];
    return dbRun(db, sql, params).then(function () {
      return dbFirst(db, "SELECT * FROM agent_examples WHERE rowid = last_insert_rowid()").then(function (row) { return jsonRes(row, 201); });
    });
  });
}

function updateAgentExample(db, id, request) {
  return request.json().then(function (body) {
    if (!body.agent_type) { return errorJson("agent_type is required", 400); }
    var sql = "UPDATE agent_examples SET agent_type=?, input=?, output=?, active=? WHERE id=?";
    var params = [body.agent_type, body.input || null, body.output || null, body.active !== undefined ? body.active : 1, id];
    return dbRun(db, sql, params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM agent_examples WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function patchAgentExample(db, id, request) {
  return request.json().then(function (body) {
    var fields = [];
    var params = [];
    var allowed = ["agent_type","input","output","active"];
    for (var i = 0; i < allowed.length; i++) {
      if (body.hasOwnProperty(allowed[i])) {
        fields.push(allowed[i] + "=?");
        params.push(body[allowed[i]]);
      }
    }
    if (fields.length === 0) { return errorJson("No valid fields to update", 400); }
    params.push(id);
    return dbRun(db, "UPDATE agent_examples SET " + fields.join(", ") + " WHERE id=?", params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM agent_examples WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function deleteAgentExample(db, id) {
  return dbRun(db, "DELETE FROM agent_examples WHERE id = ?", [id]).then(function (result) {
    if (result.meta.changes === 0) { return errorJson("Not found", 404); }
    return jsonRes({ deleted: true });
  });
}

function jsonRes(data, status) {
  status = status || 200;
  return new Response(JSON.stringify(data), { status: status, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
}

function errorJson(message, status) { return jsonRes({ error: message }, status || 500); }

export { handleAgentExamples };
