/**
 * Investors CRUD routes
 * ES5 JavaScript
 */
import { dbAll, dbFirst, dbRun } from "../db/helpers.js";

function handleInvestors(request, env, ctx) {
  var url = new URL(request.url);
  var method = request.method;
  var path = url.pathname.replace("/api/investors", "");
  var db = env.DB;

  if (path === "" || path === "/") {
    if (method === "GET") { return listInvestors(db, url); }
    if (method === "POST") { return createInvestor(db, request); }
  }

  var id = path.replace("/", "");
  if (!id) { return errorJson("Not found", 404); }

  if (method === "GET") { return getInvestor(db, id); }
  if (method === "PUT") { return updateInvestor(db, id, request); }
  if (method === "PATCH") { return patchInvestor(db, id, request); }
  if (method === "DELETE") { return deleteInvestor(db, id); }

  return errorJson("Method not allowed", 405);
}

function listInvestors(db, url) {
  var sql = "SELECT * FROM investors WHERE 1=1";
  var params = [];
  var stage = url.searchParams.get("stage");
  var tier = url.searchParams.get("tier");
  if (stage) { sql += " AND stage = ?"; params.push(stage); }
  if (tier) { sql += " AND tier = ?"; params.push(tier); }
  sql += " ORDER BY created_at DESC";
  return dbAll(db, sql, params).then(function (rows) {
    return jsonRes(rows);
  });
}

function getInvestor(db, id) {
  return dbFirst(db, "SELECT * FROM investors WHERE id = ?", [id]).then(function (row) {
    if (!row) { return errorJson("Not found", 404); }
    return jsonRes(row);
  });
}

function createInvestor(db, request) {
  return request.json().then(function (body) {
    if (!body.name) { return errorJson("name is required", 400); }
    var sql = "INSERT INTO investors (id, name, firm, tier, hq, fund_size, stage, thesis, portfolio, contact_name, contact_title, contact_email, contact_context, why_good_fit, email_subject, email_body, intro_source, intro_person, snooze_until, stale_threshold_days, notes) VALUES (hex(randomblob(8)), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    var params = [
      body.name, body.firm || null, body.tier || null, body.hq || null,
      body.fund_size || null, body.stage || "lead", body.thesis || null,
      body.portfolio || null, body.contact_name || null, body.contact_title || null,
      body.contact_email || null, body.contact_context || null, body.why_good_fit || null,
      body.email_subject || null, body.email_body || null, body.intro_source || null,
      body.intro_person || null, body.snooze_until || null,
      body.stale_threshold_days || null, body.notes || null
    ];
    return dbRun(db, sql, params).then(function (result) {
      return dbFirst(db, "SELECT * FROM investors WHERE rowid = last_insert_rowid()").then(function (row) {
        return jsonRes(row, 201);
      });
    });
  });
}

function updateInvestor(db, id, request) {
  return request.json().then(function (body) {
    if (!body.name) { return errorJson("name is required", 400); }
    var sql = "UPDATE investors SET name=?, firm=?, tier=?, hq=?, fund_size=?, stage=?, thesis=?, portfolio=?, contact_name=?, contact_title=?, contact_email=?, contact_context=?, why_good_fit=?, email_subject=?, email_body=?, intro_source=?, intro_person=?, snooze_until=?, stale_threshold_days=?, notes=?, updated_at=datetime('now') WHERE id=?";
    var params = [
      body.name, body.firm || null, body.tier || null, body.hq || null,
      body.fund_size || null, body.stage || "lead", body.thesis || null,
      body.portfolio || null, body.contact_name || null, body.contact_title || null,
      body.contact_email || null, body.contact_context || null, body.why_good_fit || null,
      body.email_subject || null, body.email_body || null, body.intro_source || null,
      body.intro_person || null, body.snooze_until || null,
      body.stale_threshold_days || null, body.notes || null, id
    ];
    return dbRun(db, sql, params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM investors WHERE id = ?", [id]).then(function (row) {
        return jsonRes(row);
      });
    });
  });
}

function patchInvestor(db, id, request) {
  return request.json().then(function (body) {
    var fields = [];
    var params = [];
    var allowed = ["name","firm","tier","hq","fund_size","stage","thesis","portfolio","contact_name","contact_title","contact_email","contact_context","why_good_fit","email_subject","email_body","intro_source","intro_person","snooze_until","stale_threshold_days","notes"];
    for (var i = 0; i < allowed.length; i++) {
      if (body.hasOwnProperty(allowed[i])) {
        fields.push(allowed[i] + "=?");
        params.push(body[allowed[i]]);
      }
    }
    if (fields.length === 0) { return errorJson("No valid fields to update", 400); }
    fields.push("updated_at=datetime('now')");
    params.push(id);
    var sql = "UPDATE investors SET " + fields.join(", ") + " WHERE id=?";
    return dbRun(db, sql, params).then(function (result) {
      if (result.meta.changes === 0) { return errorJson("Not found", 404); }
      return dbFirst(db, "SELECT * FROM investors WHERE id = ?", [id]).then(function (row) {
        return jsonRes(row);
      });
    });
  });
}

function deleteInvestor(db, id) {
  return dbRun(db, "DELETE FROM investors WHERE id = ?", [id]).then(function (result) {
    if (result.meta.changes === 0) { return errorJson("Not found", 404); }
    return jsonRes({ deleted: true });
  });
}

function jsonRes(data, status) {
  status = status || 200;
  return new Response(JSON.stringify(data), {
    status: status,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
  });
}

function errorJson(message, status) {
  return jsonRes({ error: message }, status || 500);
}

export { handleInvestors };
