/**
 * Emails CRUD routes
 * ES5 JavaScript
 */
import { dbAll, dbFirst, dbRun } from "../db/helpers.js";

function handleEmails(request, env, ctx) {
  var url = new URL(request.url);
  var method = request.method;
  var path = url.pathname.replace("/api/emails", "");
  var db = env.DB;

  if (path === "" || path === "/") {
    if (method === "GET") { return listEmails(db, url); }
    if (method === "POST") { return createEmail(db, request); }
  }

  var id = path.replace("/", "");
  if (!id) { return errorJson("Not found", 404); }

  if (method === "GET") { return getEmail(db, id); }
  if (method === "PUT") { return updateEmail(db, id, request); }
  if (method === "PATCH") { return patchEmail(db, id, request); }
  if (method === "DELETE") { return deleteEmail(db, id); }

  return errorJson("Method not allowed", 405);
}

function listEmails(db, url) {
  var sql = "SELECT * FROM emails WHERE 1=1";
  var params = [];
  var threadId = url.searchParams.get("thread_id");
  var investorId = url.searchParams.get("investor_id");
  if (threadId) { sql += " AND thread_id = ?"; params.push(threadId); }
  if (investorId) { sql += " AND investor_id = ?"; params.push(investorId); }
  sql += " ORDER BY date DESC, created_at DESC";
  return dbAll(db, sql, params).then(function (rows) { return jsonRes(rows); });
}

function getEmail(db, id) {
  return dbFirst(db, "SELECT * FROM emails WHERE id = ?", [id]).then(function (row) {
    if (!row) { return errorJson("Not found", 404); }
    return jsonRes(row);
  });
}

function createEmail(db, request) {
  return request.json().then(function (body) {
    var sql = "INSERT INTO emails (id, thread_id, investor_id, direction, from_addr, to_addr, subject, body, date, message_id) VALUES (hex(randomblob(8)), ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    var params = [body.thread_id || null, body.investor_id || null, body.direction || null, body.from_addr || null, body.to_addr || null, body.subject || null, body.body || null, body.date || null, body.message_id || null];
    return dbRun(db, sql, params).then(function () {
      return dbFirst(db, "SELECT * FROM emails WHERE rowid = last_insert_rowid()").then(function (row) { return jsonRes(row, 201); });
    });
  });
}

function updateEmail(db, id, request) {
  return request.json().then(function (body) {
    var sql = "UPDATE emails SET thread_id=?, investor_id=?, direction=?, from_addr=?, to_addr=?, subject=?, body=?, date=?, message_id=? WHERE id=?";
    var params = [body.thread_id || null, body.investor_id || null, body.direction || null, body.from_addr || null, body.to_addr || null, body.subject || null, body.body || null, body.date || null, body.message_id || null, id];
    return dbRun(db, sql, params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM emails WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function patchEmail(db, id, request) {
  return request.json().then(function (body) {
    var fields = [];
    var params = [];
    var allowed = ["thread_id","investor_id","direction","from_addr","to_addr","subject","body","date","message_id"];
    for (var i = 0; i < allowed.length; i++) {
      if (body.hasOwnProperty(allowed[i])) {
        fields.push(allowed[i] + "=?");
        params.push(body[allowed[i]]);
      }
    }
    if (fields.length === 0) { return errorJson("No valid fields to update", 400); }
    params.push(id);
    return dbRun(db, "UPDATE emails SET " + fields.join(", ") + " WHERE id=?", params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM emails WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function deleteEmail(db, id) {
  return dbRun(db, "DELETE FROM emails WHERE id = ?", [id]).then(function (result) {
    if (result.meta.changes === 0) { return errorJson("Not found", 404); }
    return jsonRes({ deleted: true });
  });
}

function jsonRes(data, status) {
  status = status || 200;
  return new Response(JSON.stringify(data), { status: status, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
}

function errorJson(message, status) { return jsonRes({ error: message }, status || 500); }

export { handleEmails };
