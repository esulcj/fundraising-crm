/**
 * Follow-ups CRUD routes
 * ES5 JavaScript
 */
import { dbAll, dbFirst, dbRun } from "../db/helpers.js";

function handleFollowUps(request, env, ctx) {
  var url = new URL(request.url);
  var method = request.method;
  var path = url.pathname.replace("/api/follow-ups", "");
  var db = env.DB;

  if (path === "/overdue") {
    if (method === "GET") { return listOverdue(db); }
  }

  if (path === "" || path === "/") {
    if (method === "GET") { return listFollowUps(db, url); }
    if (method === "POST") { return createFollowUp(db, request); }
  }

  var id = path.replace("/", "");
  if (!id) { return errorJson("Not found", 404); }

  if (method === "GET") { return getFollowUp(db, id); }
  if (method === "PUT") { return updateFollowUp(db, id, request); }
  if (method === "PATCH") { return patchFollowUp(db, id, request); }
  if (method === "DELETE") { return deleteFollowUp(db, id); }

  return errorJson("Method not allowed", 405);
}

function listFollowUps(db, url) {
  var sql = "SELECT * FROM follow_ups WHERE 1=1";
  var params = [];
  var investorId = url.searchParams.get("investor_id");
  var status = url.searchParams.get("status");
  var dueDate = url.searchParams.get("due_date");
  if (investorId) { sql += " AND investor_id = ?"; params.push(investorId); }
  if (status) { sql += " AND status = ?"; params.push(status); }
  if (dueDate) { sql += " AND due_date = ?"; params.push(dueDate); }
  sql += " ORDER BY due_date ASC";
  return dbAll(db, sql, params).then(function (rows) { return jsonRes(rows); });
}

function listOverdue(db) {
  var sql = "SELECT * FROM follow_ups WHERE status != 'done' AND due_date < datetime('now') ORDER BY due_date ASC";
  return dbAll(db, sql).then(function (rows) { return jsonRes(rows); });
}

function getFollowUp(db, id) {
  return dbFirst(db, "SELECT * FROM follow_ups WHERE id = ?", [id]).then(function (row) {
    if (!row) { return errorJson("Not found", 404); }
    return jsonRes(row);
  });
}

function createFollowUp(db, request) {
  return request.json().then(function (body) {
    if (!body.investor_id) { return errorJson("investor_id is required", 400); }
    if (!body.description) { return errorJson("description is required", 400); }
    if (!body.due_date) { return errorJson("due_date is required", 400); }
    var sql = "INSERT INTO follow_ups (id, investor_id, description, due_date, status, created_from) VALUES (hex(randomblob(8)), ?, ?, ?, ?, ?)";
    var params = [body.investor_id, body.description, body.due_date, body.status || "pending", body.created_from || null];
    return dbRun(db, sql, params).then(function () {
      return dbFirst(db, "SELECT * FROM follow_ups WHERE rowid = last_insert_rowid()").then(function (row) { return jsonRes(row, 201); });
    });
  });
}

function updateFollowUp(db, id, request) {
  return request.json().then(function (body) {
    if (!body.investor_id) { return errorJson("investor_id is required", 400); }
    if (!body.description) { return errorJson("description is required", 400); }
    if (!body.due_date) { return errorJson("due_date is required", 400); }
    var sql = "UPDATE follow_ups SET investor_id=?, description=?, due_date=?, status=?, created_from=? WHERE id=?";
    var params = [body.investor_id, body.description, body.due_date, body.status || "pending", body.created_from || null, id];
    return dbRun(db, sql, params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM follow_ups WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function patchFollowUp(db, id, request) {
  return request.json().then(function (body) {
    var fields = [];
    var params = [];
    var allowed = ["investor_id","description","due_date","status","created_from"];
    for (var i = 0; i < allowed.length; i++) {
      if (body.hasOwnProperty(allowed[i])) {
        fields.push(allowed[i] + "=?");
        params.push(body[allowed[i]]);
      }
    }
    if (fields.length === 0) { return errorJson("No valid fields to update", 400); }
    params.push(id);
    return dbRun(db, "UPDATE follow_ups SET " + fields.join(", ") + " WHERE id=?", params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM follow_ups WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function deleteFollowUp(db, id) {
  return dbRun(db, "DELETE FROM follow_ups WHERE id = ?", [id]).then(function (result) {
    if (result.meta.changes === 0) { return errorJson("Not found", 404); }
    return jsonRes({ deleted: true });
  });
}

function jsonRes(data, status) {
  status = status || 200;
  return new Response(JSON.stringify(data), { status: status, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
}

function errorJson(message, status) { return jsonRes({ error: message }, status || 500); }

export { handleFollowUps };
