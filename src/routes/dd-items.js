/**
 * DD Items CRUD routes
 * ES5 JavaScript
 */
import { dbAll, dbFirst, dbRun } from "../db/helpers.js";

function handleDdItems(request, env, ctx) {
  var url = new URL(request.url);
  var method = request.method;
  var path = url.pathname.replace("/api/dd-items", "");
  var db = env.DB;

  if (path === "" || path === "/") {
    if (method === "GET") { return listDdItems(db, url); }
    if (method === "POST") { return createDdItem(db, request); }
  }

  var id = path.replace("/", "");
  if (!id) { return errorJson("Not found", 404); }

  if (method === "GET") { return getDdItem(db, id); }
  if (method === "PUT") { return updateDdItem(db, id, request); }
  if (method === "PATCH") { return patchDdItem(db, id, request); }
  if (method === "DELETE") { return deleteDdItem(db, id); }

  return errorJson("Method not allowed", 405);
}

function listDdItems(db, url) {
  var sql = "SELECT * FROM dd_items WHERE 1=1";
  var params = [];
  var investorId = url.searchParams.get("investor_id");
  var status = url.searchParams.get("status");
  if (investorId) { sql += " AND investor_id = ?"; params.push(investorId); }
  if (status) { sql += " AND status = ?"; params.push(status); }
  sql += " ORDER BY created_at DESC";
  return dbAll(db, sql, params).then(function (rows) { return jsonRes(rows); });
}

function getDdItem(db, id) {
  return dbFirst(db, "SELECT * FROM dd_items WHERE id = ?", [id]).then(function (row) {
    if (!row) { return errorJson("Not found", 404); }
    return jsonRes(row);
  });
}

function createDdItem(db, request) {
  return request.json().then(function (body) {
    if (!body.investor_id) { return errorJson("investor_id is required", 400); }
    if (!body.question) { return errorJson("question is required", 400); }
    var sql = "INSERT INTO dd_items (id, investor_id, question, answer, status, extracted_from_interaction_id) VALUES (hex(randomblob(8)), ?, ?, ?, ?, ?)";
    var params = [body.investor_id, body.question, body.answer || null, body.status || "asked", body.extracted_from_interaction_id || null];
    return dbRun(db, sql, params).then(function () {
      return dbFirst(db, "SELECT * FROM dd_items WHERE rowid = last_insert_rowid()").then(function (row) { return jsonRes(row, 201); });
    });
  });
}

function updateDdItem(db, id, request) {
  return request.json().then(function (body) {
    if (!body.investor_id) { return errorJson("investor_id is required", 400); }
    if (!body.question) { return errorJson("question is required", 400); }
    var sql = "UPDATE dd_items SET investor_id=?, question=?, answer=?, status=?, extracted_from_interaction_id=? WHERE id=?";
    var params = [body.investor_id, body.question, body.answer || null, body.status || "asked", body.extracted_from_interaction_id || null, id];
    return dbRun(db, sql, params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM dd_items WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function patchDdItem(db, id, request) {
  return request.json().then(function (body) {
    var fields = [];
    var params = [];
    var allowed = ["investor_id","question","answer","status","extracted_from_interaction_id"];
    for (var i = 0; i < allowed.length; i++) {
      if (body.hasOwnProperty(allowed[i])) {
        fields.push(allowed[i] + "=?");
        params.push(body[allowed[i]]);
      }
    }
    if (fields.length === 0) { return errorJson("No valid fields to update", 400); }
    params.push(id);
    return dbRun(db, "UPDATE dd_items SET " + fields.join(", ") + " WHERE id=?", params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM dd_items WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function deleteDdItem(db, id) {
  return dbRun(db, "DELETE FROM dd_items WHERE id = ?", [id]).then(function (result) {
    if (result.meta.changes === 0) { return errorJson("Not found", 404); }
    return jsonRes({ deleted: true });
  });
}

function jsonRes(data, status) {
  status = status || 200;
  return new Response(JSON.stringify(data), { status: status, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
}

function errorJson(message, status) { return jsonRes({ error: message }, status || 500); }

export { handleDdItems };
