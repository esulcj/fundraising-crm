/**
 * Agent Configs CRUD routes
 * ES5 JavaScript
 */
import { dbAll, dbFirst, dbRun } from "../db/helpers.js";

function handleAgentConfigs(request, env, ctx) {
  var url = new URL(request.url);
  var method = request.method;
  var path = url.pathname.replace("/api/agent-configs", "");
  var db = env.DB;

  if (path === "" || path === "/") {
    if (method === "GET") { return listAgentConfigs(db, url); }
    if (method === "POST") { return createAgentConfig(db, request); }
  }

  var id = path.replace("/", "");
  if (!id) { return errorJson("Not found", 404); }

  if (method === "GET") { return getAgentConfig(db, id); }
  if (method === "PUT") { return updateAgentConfig(db, id, request); }
  if (method === "PATCH") { return patchAgentConfig(db, id, request); }
  if (method === "DELETE") { return deleteAgentConfig(db, id); }

  return errorJson("Method not allowed", 405);
}

function listAgentConfigs(db, url) {
  var sql = "SELECT * FROM agent_configs WHERE 1=1";
  var params = [];
  var agentType = url.searchParams.get("agent_type");
  if (agentType) { sql += " AND agent_type = ?"; params.push(agentType); }
  sql += " ORDER BY updated_at DESC";
  return dbAll(db, sql, params).then(function (rows) { return jsonRes(rows); });
}

function getAgentConfig(db, id) {
  return dbFirst(db, "SELECT * FROM agent_configs WHERE id = ?", [id]).then(function (row) {
    if (!row) { return errorJson("Not found", 404); }
    return jsonRes(row);
  });
}

function createAgentConfig(db, request) {
  return request.json().then(function (body) {
    if (!body.agent_type) { return errorJson("agent_type is required", 400); }
    var sql = "INSERT INTO agent_configs (id, agent_type, system_prompt, config_json, version) VALUES (hex(randomblob(8)), ?, ?, ?, 1)";
    var params = [body.agent_type, body.system_prompt || null, body.config_json || null];
    return dbRun(db, sql, params).then(function () {
      return dbFirst(db, "SELECT * FROM agent_configs WHERE rowid = last_insert_rowid()").then(function (row) { return jsonRes(row, 201); });
    });
  });
}

function updateAgentConfig(db, id, request) {
  return request.json().then(function (body) {
    if (!body.agent_type) { return errorJson("agent_type is required", 400); }
    var sql = "UPDATE agent_configs SET agent_type=?, system_prompt=?, config_json=?, version=version+1, updated_at=datetime('now') WHERE id=?";
    var params = [body.agent_type, body.system_prompt || null, body.config_json || null, id];
    return dbRun(db, sql, params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM agent_configs WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function patchAgentConfig(db, id, request) {
  return request.json().then(function (body) {
    var fields = [];
    var params = [];
    var allowed = ["agent_type","system_prompt","config_json"];
    for (var i = 0; i < allowed.length; i++) {
      if (body.hasOwnProperty(allowed[i])) {
        fields.push(allowed[i] + "=?");
        params.push(body[allowed[i]]);
      }
    }
    if (fields.length === 0) { return errorJson("No valid fields to update", 400); }
    fields.push("version=version+1");
    fields.push("updated_at=datetime('now')");
    params.push(id);
    return dbRun(db, "UPDATE agent_configs SET " + fields.join(", ") + " WHERE id=?", params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM agent_configs WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function deleteAgentConfig(db, id) {
  return dbRun(db, "DELETE FROM agent_configs WHERE id = ?", [id]).then(function (result) {
    if (result.meta.changes === 0) { return errorJson("Not found", 404); }
    return jsonRes({ deleted: true });
  });
}

function jsonRes(data, status) {
  status = status || 200;
  return new Response(JSON.stringify(data), { status: status, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
}

function errorJson(message, status) { return jsonRes({ error: message }, status || 500); }

export { handleAgentConfigs };
