/**
 * Transcripts CRUD routes
 * ES5 JavaScript
 */
import { dbAll, dbFirst, dbRun } from "../db/helpers.js";

function handleTranscripts(request, env, ctx) {
  var url = new URL(request.url);
  var method = request.method;
  var path = url.pathname.replace("/api/transcripts", "");
  var db = env.DB;

  if (path === "" || path === "/") {
    if (method === "GET") { return listTranscripts(db, url); }
    if (method === "POST") { return createTranscript(db, request); }
  }

  var id = path.replace("/", "");
  if (!id) { return errorJson("Not found", 404); }

  if (method === "GET") { return getTranscript(db, id); }
  if (method === "PUT") { return updateTranscript(db, id, request); }
  if (method === "PATCH") { return patchTranscript(db, id, request); }
  if (method === "DELETE") { return deleteTranscript(db, id); }

  return errorJson("Method not allowed", 405);
}

function listTranscripts(db, url) {
  var sql = "SELECT * FROM transcripts WHERE 1=1";
  var params = [];
  var investorId = url.searchParams.get("investor_id");
  if (investorId) { sql += " AND investor_id = ?"; params.push(investorId); }
  sql += " ORDER BY processed_at DESC";
  return dbAll(db, sql, params).then(function (rows) { return jsonRes(rows); });
}

function getTranscript(db, id) {
  return dbFirst(db, "SELECT * FROM transcripts WHERE id = ?", [id]).then(function (row) {
    if (!row) { return errorJson("Not found", 404); }
    return jsonRes(row);
  });
}

function createTranscript(db, request) {
  return request.json().then(function (body) {
    var sql = "INSERT INTO transcripts (id, investor_id, interaction_id, raw_text, extracted_json, processed_at) VALUES (hex(randomblob(8)), ?, ?, ?, ?, ?)";
    var params = [body.investor_id || null, body.interaction_id || null, body.raw_text || null, body.extracted_json || null, body.processed_at || null];
    return dbRun(db, sql, params).then(function () {
      return dbFirst(db, "SELECT * FROM transcripts WHERE rowid = last_insert_rowid()").then(function (row) { return jsonRes(row, 201); });
    });
  });
}

function updateTranscript(db, id, request) {
  return request.json().then(function (body) {
    var sql = "UPDATE transcripts SET investor_id=?, interaction_id=?, raw_text=?, extracted_json=?, processed_at=? WHERE id=?";
    var params = [body.investor_id || null, body.interaction_id || null, body.raw_text || null, body.extracted_json || null, body.processed_at || null, id];
    return dbRun(db, sql, params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM transcripts WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function patchTranscript(db, id, request) {
  return request.json().then(function (body) {
    var fields = [];
    var params = [];
    var allowed = ["investor_id","interaction_id","raw_text","extracted_json","processed_at"];
    for (var i = 0; i < allowed.length; i++) {
      if (body.hasOwnProperty(allowed[i])) {
        fields.push(allowed[i] + "=?");
        params.push(body[allowed[i]]);
      }
    }
    if (fields.length === 0) { return errorJson("No valid fields to update", 400); }
    params.push(id);
    return dbRun(db, "UPDATE transcripts SET " + fields.join(", ") + " WHERE id=?", params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM transcripts WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function deleteTranscript(db, id) {
  return dbRun(db, "DELETE FROM transcripts WHERE id = ?", [id]).then(function (result) {
    if (result.meta.changes === 0) { return errorJson("Not found", 404); }
    return jsonRes({ deleted: true });
  });
}

function jsonRes(data, status) {
  status = status || 200;
  return new Response(JSON.stringify(data), { status: status, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
}

function errorJson(message, status) { return jsonRes({ error: message }, status || 500); }

export { handleTranscripts };
