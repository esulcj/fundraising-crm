/**
 * Actions CRUD routes
 * ES5 JavaScript
 */
import { dbAll, dbFirst, dbRun } from "../db/helpers.js";

function handleActions(request, env, ctx) {
  var url = new URL(request.url);
  var method = request.method;
  var path = url.pathname.replace("/api/actions", "");
  var db = env.DB;

  if (path === "" || path === "/") {
    if (method === "GET") { return listActions(db, url); }
    if (method === "POST") { return createAction(db, request); }
  }

  var id = path.replace("/", "");
  if (!id) { return errorJson("Not found", 404); }

  if (method === "GET") { return getAction(db, id); }
  if (method === "PUT") { return updateAction(db, id, request); }
  if (method === "PATCH") { return patchAction(db, id, request); }
  if (method === "DELETE") { return deleteAction(db, id); }

  return errorJson("Method not allowed", 405);
}

function listActions(db, url) {
  var sql = "SELECT * FROM actions WHERE 1=1";
  var params = [];
  var investorId = url.searchParams.get("investor_id");
  var status = url.searchParams.get("status");
  if (investorId) { sql += " AND investor_id = ?"; params.push(investorId); }
  if (status) { sql += " AND status = ?"; params.push(status); }
  sql += " ORDER BY created_at DESC";
  return dbAll(db, sql, params).then(function (rows) { return jsonRes(rows); });
}

function getAction(db, id) {
  return dbFirst(db, "SELECT * FROM actions WHERE id = ?", [id]).then(function (row) {
    if (!row) { return errorJson("Not found", 404); }
    return jsonRes(row);
  });
}

function createAction(db, request) {
  return request.json().then(function (body) {
    if (!body.investor_id) { return errorJson("investor_id is required", 400); }
    if (!body.description) { return errorJson("description is required", 400); }
    var sql = "INSERT INTO actions (id, investor_id, description, status, source, scheduled_date, due_date, completed_at) VALUES (hex(randomblob(8)), ?, ?, ?, ?, ?, ?, ?)";
    var params = [body.investor_id, body.description, body.status || "pending", body.source || "manual", body.scheduled_date || null, body.due_date || null, body.completed_at || null];
    return dbRun(db, sql, params).then(function () {
      return dbFirst(db, "SELECT * FROM actions WHERE rowid = last_insert_rowid()").then(function (row) { return jsonRes(row, 201); });
    });
  });
}

function updateAction(db, id, request) {
  return request.json().then(function (body) {
    if (!body.investor_id) { return errorJson("investor_id is required", 400); }
    if (!body.description) { return errorJson("description is required", 400); }
    var sql = "UPDATE actions SET investor_id=?, description=?, status=?, source=?, scheduled_date=?, due_date=?, completed_at=? WHERE id=?";
    var params = [body.investor_id, body.description, body.status || "pending", body.source || "manual", body.scheduled_date || null, body.due_date || null, body.completed_at || null, id];
    return dbRun(db, sql, params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM actions WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function patchAction(db, id, request) {
  return request.json().then(function (body) {
    var fields = [];
    var params = [];
    var allowed = ["investor_id","description","status","source","scheduled_date","due_date","completed_at"];
    for (var i = 0; i < allowed.length; i++) {
      if (body.hasOwnProperty(allowed[i])) {
        fields.push(allowed[i] + "=?");
        params.push(body[allowed[i]]);
      }
    }
    if (fields.length === 0) { return errorJson("No valid fields to update", 400); }
    params.push(id);
    return dbRun(db, "UPDATE actions SET " + fields.join(", ") + " WHERE id=?", params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM actions WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function deleteAction(db, id) {
  return dbRun(db, "DELETE FROM actions WHERE id = ?", [id]).then(function (result) {
    if (result.meta.changes === 0) { return errorJson("Not found", 404); }
    return jsonRes({ deleted: true });
  });
}

function jsonRes(data, status) {
  status = status || 200;
  return new Response(JSON.stringify(data), { status: status, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
}

function errorJson(message, status) { return jsonRes({ error: message }, status || 500); }

export { handleActions };
