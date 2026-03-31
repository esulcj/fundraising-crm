/**
 * Interactions CRUD routes
 * ES5 JavaScript
 */
import { dbAll, dbFirst, dbRun } from "../db/helpers.js";

function handleInteractions(request, env, ctx) {
  var url = new URL(request.url);
  var method = request.method;
  var path = url.pathname.replace("/api/interactions", "");
  var db = env.DB;

  if (path === "" || path === "/") {
    if (method === "GET") { return listInteractions(db, url); }
    if (method === "POST") { return createInteraction(db, request); }
  }

  var id = path.replace("/", "");
  if (!id) { return errorJson("Not found", 404); }

  if (method === "GET") { return getInteraction(db, id); }
  if (method === "PUT") { return updateInteraction(db, id, request); }
  if (method === "PATCH") { return patchInteraction(db, id, request); }
  if (method === "DELETE") { return deleteInteraction(db, id); }

  return errorJson("Method not allowed", 405);
}

function listInteractions(db, url) {
  var sql = "SELECT * FROM interactions WHERE 1=1";
  var params = [];
  var investorId = url.searchParams.get("investor_id");
  if (investorId) { sql += " AND investor_id = ?"; params.push(investorId); }
  sql += " ORDER BY created_at DESC";
  return dbAll(db, sql, params).then(function (rows) { return jsonRes(rows); });
}

function getInteraction(db, id) {
  return dbFirst(db, "SELECT * FROM interactions WHERE id = ?", [id]).then(function (row) {
    if (!row) { return errorJson("Not found", 404); }
    return jsonRes(row);
  });
}

function createInteraction(db, request) {
  return request.json().then(function (body) {
    if (!body.investor_id) { return errorJson("investor_id is required", 400); }
    var sql = "INSERT INTO interactions (id, investor_id, type, summary, transcript_raw, transcript_extracted, sentiment, follow_up_date, notes) VALUES (hex(randomblob(8)), ?, ?, ?, ?, ?, ?, ?, ?)";
    var params = [body.investor_id, body.type || null, body.summary || null, body.transcript_raw || null, body.transcript_extracted || null, body.sentiment || null, body.follow_up_date || null, body.notes || null];
    return dbRun(db, sql, params).then(function () {
      return dbFirst(db, "SELECT * FROM interactions WHERE rowid = last_insert_rowid()").then(function (row) { return jsonRes(row, 201); });
    });
  });
}

function updateInteraction(db, id, request) {
  return request.json().then(function (body) {
    if (!body.investor_id) { return errorJson("investor_id is required", 400); }
    var sql = "UPDATE interactions SET investor_id=?, type=?, summary=?, transcript_raw=?, transcript_extracted=?, sentiment=?, follow_up_date=?, notes=? WHERE id=?";
    var params = [body.investor_id, body.type || null, body.summary || null, body.transcript_raw || null, body.transcript_extracted || null, body.sentiment || null, body.follow_up_date || null, body.notes || null, id];
    return dbRun(db, sql, params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM interactions WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function patchInteraction(db, id, request) {
  return request.json().then(function (body) {
    var fields = [];
    var params = [];
    var allowed = ["investor_id","type","summary","transcript_raw","transcript_extracted","sentiment","follow_up_date","notes"];
    for (var i = 0; i < allowed.length; i++) {
      if (body.hasOwnProperty(allowed[i])) {
        fields.push(allowed[i] + "=?");
        params.push(body[allowed[i]]);
      }
    }
    if (fields.length === 0) { return errorJson("No valid fields to update", 400); }
    params.push(id);
    return dbRun(db, "UPDATE interactions SET " + fields.join(", ") + " WHERE id=?", params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM interactions WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function deleteInteraction(db, id) {
  return dbRun(db, "DELETE FROM interactions WHERE id = ?", [id]).then(function (result) {
    if (result.meta.changes === 0) { return errorJson("Not found", 404); }
    return jsonRes({ deleted: true });
  });
}

function jsonRes(data, status) {
  status = status || 200;
  return new Response(JSON.stringify(data), { status: status, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
}

function errorJson(message, status) { return jsonRes({ error: message }, status || 500); }

export { handleInteractions };
