/**
 * Email Threads CRUD routes
 * ES5 JavaScript
 */
import { dbAll, dbFirst, dbRun } from "../db/helpers.js";

function handleEmailThreads(request, env, ctx) {
  var url = new URL(request.url);
  var method = request.method;
  var path = url.pathname.replace("/api/email-threads", "");
  var db = env.DB;

  if (path === "" || path === "/") {
    if (method === "GET") { return listEmailThreads(db, url); }
    if (method === "POST") { return createEmailThread(db, request); }
  }

  var id = path.replace("/", "");
  if (!id) { return errorJson("Not found", 404); }

  if (method === "GET") { return getEmailThread(db, id); }
  if (method === "PUT") { return updateEmailThread(db, id, request); }
  if (method === "PATCH") { return patchEmailThread(db, id, request); }
  if (method === "DELETE") { return deleteEmailThread(db, id); }

  return errorJson("Method not allowed", 405);
}

function listEmailThreads(db, url) {
  var sql = "SELECT * FROM email_threads WHERE 1=1";
  var params = [];
  var investorId = url.searchParams.get("investor_id");
  if (investorId) { sql += " AND investor_id = ?"; params.push(investorId); }
  sql += " ORDER BY last_message_at DESC";
  return dbAll(db, sql, params).then(function (rows) { return jsonRes(rows); });
}

function getEmailThread(db, id) {
  return dbFirst(db, "SELECT * FROM email_threads WHERE id = ?", [id]).then(function (row) {
    if (!row) { return errorJson("Not found", 404); }
    return jsonRes(row);
  });
}

function createEmailThread(db, request) {
  return request.json().then(function (body) {
    var sql = "INSERT INTO email_threads (id, investor_id, subject, last_message_at, thread_json) VALUES (hex(randomblob(8)), ?, ?, ?, ?)";
    var params = [body.investor_id || null, body.subject || null, body.last_message_at || null, body.thread_json || null];
    return dbRun(db, sql, params).then(function () {
      return dbFirst(db, "SELECT * FROM email_threads WHERE rowid = last_insert_rowid()").then(function (row) { return jsonRes(row, 201); });
    });
  });
}

function updateEmailThread(db, id, request) {
  return request.json().then(function (body) {
    var sql = "UPDATE email_threads SET investor_id=?, subject=?, last_message_at=?, thread_json=? WHERE id=?";
    var params = [body.investor_id || null, body.subject || null, body.last_message_at || null, body.thread_json || null, id];
    return dbRun(db, sql, params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM email_threads WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function patchEmailThread(db, id, request) {
  return request.json().then(function (body) {
    var fields = [];
    var params = [];
    var allowed = ["investor_id","subject","last_message_at","thread_json"];
    for (var i = 0; i < allowed.length; i++) {
      if (body.hasOwnProperty(allowed[i])) {
        fields.push(allowed[i] + "=?");
        params.push(body[allowed[i]]);
      }
    }
    if (fields.length === 0) { return errorJson("No valid fields to update", 400); }
    params.push(id);
    return dbRun(db, "UPDATE email_threads SET " + fields.join(", ") + " WHERE id=?", params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM email_threads WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function deleteEmailThread(db, id) {
  return dbRun(db, "DELETE FROM email_threads WHERE id = ?", [id]).then(function (result) {
    if (result.meta.changes === 0) { return errorJson("Not found", 404); }
    return jsonRes({ deleted: true });
  });
}

function jsonRes(data, status) {
  status = status || 200;
  return new Response(JSON.stringify(data), { status: status, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
}

function errorJson(message, status) { return jsonRes({ error: message }, status || 500); }

export { handleEmailThreads };
