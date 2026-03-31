/**
 * Contacts CRUD routes
 * ES5 JavaScript
 */
import { dbAll, dbFirst, dbRun } from "../db/helpers.js";

function handleContacts(request, env, ctx) {
  var url = new URL(request.url);
  var method = request.method;
  var path = url.pathname.replace("/api/contacts", "");
  var db = env.DB;

  if (path === "" || path === "/") {
    if (method === "GET") { return listContacts(db, url); }
    if (method === "POST") { return createContact(db, request); }
  }

  var id = path.replace("/", "");
  if (!id) { return errorJson("Not found", 404); }

  if (method === "GET") { return getContact(db, id); }
  if (method === "PUT") { return updateContact(db, id, request); }
  if (method === "PATCH") { return patchContact(db, id, request); }
  if (method === "DELETE") { return deleteContact(db, id); }

  return errorJson("Method not allowed", 405);
}

function listContacts(db, url) {
  var sql = "SELECT * FROM contacts WHERE 1=1";
  var params = [];
  var investorId = url.searchParams.get("investor_id");
  if (investorId) { sql += " AND investor_id = ?"; params.push(investorId); }
  sql += " ORDER BY created_at DESC";
  return dbAll(db, sql, params).then(function (rows) { return jsonRes(rows); });
}

function getContact(db, id) {
  return dbFirst(db, "SELECT * FROM contacts WHERE id = ?", [id]).then(function (row) {
    if (!row) { return errorJson("Not found", 404); }
    return jsonRes(row);
  });
}

function createContact(db, request) {
  return request.json().then(function (body) {
    if (!body.investor_id) { return errorJson("investor_id is required", 400); }
    if (!body.name) { return errorJson("name is required", 400); }
    var sql = "INSERT INTO contacts (id, investor_id, name, title, email, phone, role, is_primary, notes) VALUES (hex(randomblob(8)), ?, ?, ?, ?, ?, ?, ?, ?)";
    var params = [body.investor_id, body.name, body.title || null, body.email || null, body.phone || null, body.role || "other", body.is_primary || 0, body.notes || null];
    return dbRun(db, sql, params).then(function () {
      return dbFirst(db, "SELECT * FROM contacts WHERE rowid = last_insert_rowid()").then(function (row) {
        return jsonRes(row, 201);
      });
    });
  });
}

function updateContact(db, id, request) {
  return request.json().then(function (body) {
    if (!body.investor_id) { return errorJson("investor_id is required", 400); }
    if (!body.name) { return errorJson("name is required", 400); }
    var sql = "UPDATE contacts SET investor_id=?, name=?, title=?, email=?, phone=?, role=?, is_primary=?, notes=? WHERE id=?";
    var params = [body.investor_id, body.name, body.title || null, body.email || null, body.phone || null, body.role || "other", body.is_primary || 0, body.notes || null, id];
    return dbRun(db, sql, params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM contacts WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function patchContact(db, id, request) {
  return request.json().then(function (body) {
    var fields = [];
    var params = [];
    var allowed = ["investor_id","name","title","email","phone","role","is_primary","notes"];
    for (var i = 0; i < allowed.length; i++) {
      if (body.hasOwnProperty(allowed[i])) {
        fields.push(allowed[i] + "=?");
        params.push(body[allowed[i]]);
      }
    }
    if (fields.length === 0) { return errorJson("No valid fields to update", 400); }
    params.push(id);
    return dbRun(db, "UPDATE contacts SET " + fields.join(", ") + " WHERE id=?", params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM contacts WHERE id = ?", [id]).then(function (row) { return jsonRes(row); });
    });
  });
}

function deleteContact(db, id) {
  return dbRun(db, "DELETE FROM contacts WHERE id = ?", [id]).then(function (result) {
    if (result.meta.changes === 0) { return errorJson("Not found", 404); }
    return jsonRes({ deleted: true });
  });
}

function jsonRes(data, status) {
  status = status || 200;
  return new Response(JSON.stringify(data), { status: status, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
}

function errorJson(message, status) { return jsonRes({ error: message }, status || 500); }

export { handleContacts };
