/**
 * Materials CRUD routes
 * ES5 JavaScript
 */
import { dbAll, dbFirst, dbRun } from "../db/helpers.js";

function handleMaterials(request, env, ctx) {
  var url = new URL(request.url);
  var method = request.method;
  var path = url.pathname.replace("/api/materials", "");
  var db = env.DB;

  if (path === "" || path === "/") {
    if (method === "GET") { return listMaterials(db, url); }
    if (method === "POST") { return createMaterial(db, request); }
  }

  var id = path.replace("/", "");
  if (!id) { return errorJson("Not found", 404); }

  if (method === "GET") { return getMaterial(db, id); }
  if (method === "PUT") { return updateMaterial(db, id, request); }
  if (method === "PATCH") { return patchMaterial(db, id, request); }
  if (method === "DELETE") { return deleteMaterial(db, id); }

  return errorJson("Method not allowed", 405);
}

function listMaterials(db, url) {
  var sql = "SELECT * FROM materials WHERE 1=1";
  var params = [];
  var investorId = url.searchParams.get("investor_id");
  if (investorId) { sql += " AND investor_id = ?"; params.push(investorId); }
  sql += " ORDER BY created_at DESC";
  return dbAll(db, sql, params).then(function (rows) { return jsonRes(rows); });
}

function getMaterial(db, id) {
  return dbFirst(db, "SELECT * FROM materials WHERE id = ?", [id]).then(function (row) {
    if (!row) { return errorJson("Not found", 404); }
    return jsonRes(row);
  });
}

function createMaterial(db, request) {
  return request.json().then(function (body) {
    if (!body.investor_id) { return errorJson("investor_id is required", 400); }
    if (!body.type) { return errorJson("type is required", 400); }
    var sql = "INSERT INTO materials (id, investor_id, type, name, version, deck_version, date_shared, notes) VALUES (hex(randomblob(8)), ?, ?, ?, ?, ?, ?, ?)";
    var params = [body.investor_id, body.type, body.name || null, body.version || null, body.deck_version || null, body.date_shared || null, body.notes || null];
    return dbRun(db, sql, params).then(function () {
      return dbFirst(db, "SELECT * FROM materials WHERE rowid = last_insert_rowid()").then(function (row) { return jsonRes(row, 201); });
    });
  });
}

function updateMaterial(db, id, request) {
  return request.json().then(function (body) {
    if (!body.investor_id) { return errorJson("investor_id is required", 400); }
    if (!body.type) { return errorJson("type is required", 400); }
    var sql = "UPDATE materials SET investor_id=?, type=?, name=?, version=?, deck_version=?, date_shared=?, notes=? WHERE id=?";
    var params = [body.investor_id, body.type, body.name || null, body.version || null, body.deck_version || null, body.date_shared || null, body.notes || null, id];
    return dbRun(db, sql, params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM materials WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function patchMaterial(db, id, request) {
  return request.json().then(function (body) {
    var fields = [];
    var params = [];
    var allowed = ["investor_id","type","name","version","deck_version","date_shared","notes"];
    for (var i = 0; i < allowed.length; i++) {
      if (body.hasOwnProperty(allowed[i])) {
        fields.push(allowed[i] + "=?");
        params.push(body[allowed[i]]);
      }
    }
    if (fields.length === 0) { return errorJson("No valid fields to update", 400); }
    params.push(id);
    return dbRun(db, "UPDATE materials SET " + fields.join(", ") + " WHERE id=?", params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM materials WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function deleteMaterial(db, id) {
  return dbRun(db, "DELETE FROM materials WHERE id = ?", [id]).then(function (result) {
    if (result.meta.changes === 0) { return errorJson("Not found", 404); }
    return jsonRes({ deleted: true });
  });
}

function jsonRes(data, status) {
  status = status || 200;
  return new Response(JSON.stringify(data), { status: status, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
}

function errorJson(message, status) { return jsonRes({ error: message }, status || 500); }

export { handleMaterials };
