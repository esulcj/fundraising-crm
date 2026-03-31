/**
 * Briefings CRUD routes
 * ES5 JavaScript
 */
import { dbAll, dbFirst, dbRun } from "../db/helpers.js";

function handleBriefings(request, env, ctx) {
  var url = new URL(request.url);
  var method = request.method;
  var path = url.pathname.replace("/api/briefings", "");
  var db = env.DB;

  if (path === "/latest") {
    if (method === "GET") { return getLatestBriefing(db, url); }
  }

  if (path === "" || path === "/") {
    if (method === "GET") { return listBriefings(db, url); }
    if (method === "POST") { return createBriefing(db, request); }
  }

  var id = path.replace("/", "");
  if (!id) { return errorJson("Not found", 404); }

  if (method === "GET") { return getBriefing(db, id); }
  if (method === "PUT") { return updateBriefing(db, id, request); }
  if (method === "PATCH") { return patchBriefing(db, id, request); }
  if (method === "DELETE") { return deleteBriefing(db, id); }

  return errorJson("Method not allowed", 405);
}

function listBriefings(db, url) {
  var sql = "SELECT * FROM briefings WHERE 1=1";
  var params = [];
  var type = url.searchParams.get("type");
  if (type) { sql += " AND type = ?"; params.push(type); }
  sql += " ORDER BY generated_at DESC";
  return dbAll(db, sql, params).then(function (rows) { return jsonRes(rows); });
}

function getLatestBriefing(db, url) {
  var sql = "SELECT * FROM briefings ORDER BY generated_at DESC LIMIT 1";
  var type = url.searchParams.get("type");
  var params = [];
  if (type) {
    sql = "SELECT * FROM briefings WHERE type = ? ORDER BY generated_at DESC LIMIT 1";
    params.push(type);
  }
  return dbFirst(db, sql, params).then(function (row) {
    if (!row) { return errorJson("Not found", 404); }
    return jsonRes(row);
  });
}

function getBriefing(db, id) {
  return dbFirst(db, "SELECT * FROM briefings WHERE id = ?", [id]).then(function (row) {
    if (!row) { return errorJson("Not found", 404); }
    return jsonRes(row);
  });
}

function createBriefing(db, request) {
  return request.json().then(function (body) {
    if (!body.type) { return errorJson("type is required", 400); }
    var sql = "INSERT INTO briefings (id, type, investor_id, content) VALUES (hex(randomblob(8)), ?, ?, ?)";
    var params = [body.type, body.investor_id || null, body.content || null];
    return dbRun(db, sql, params).then(function () {
      return dbFirst(db, "SELECT * FROM briefings WHERE rowid = last_insert_rowid()").then(function (row) { return jsonRes(row, 201); });
    });
  });
}

function updateBriefing(db, id, request) {
  return request.json().then(function (body) {
    if (!body.type) { return errorJson("type is required", 400); }
    var sql = "UPDATE briefings SET type=?, investor_id=?, content=? WHERE id=?";
    var params = [body.type, body.investor_id || null, body.content || null, id];
    return dbRun(db, sql, params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM briefings WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function patchBriefing(db, id, request) {
  return request.json().then(function (body) {
    var fields = [];
    var params = [];
    var allowed = ["type","investor_id","content"];
    for (var i = 0; i < allowed.length; i++) {
      if (body.hasOwnProperty(allowed[i])) {
        fields.push(allowed[i] + "=?");
        params.push(body[allowed[i]]);
      }
    }
    if (fields.length === 0) { return errorJson("No valid fields to update", 400); }
    params.push(id);
    return dbRun(db, "UPDATE briefings SET " + fields.join(", ") + " WHERE id=?", params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM briefings WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function deleteBriefing(db, id) {
  return dbRun(db, "DELETE FROM briefings WHERE id = ?", [id]).then(function (result) {
    if (result.meta.changes === 0) { return errorJson("Not found", 404); }
    return jsonRes({ deleted: true });
  });
}

function jsonRes(data, status) {
  status = status || 200;
  return new Response(JSON.stringify(data), { status: status, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
}

function errorJson(message, status) { return jsonRes({ error: message }, status || 500); }

export { handleBriefings };
