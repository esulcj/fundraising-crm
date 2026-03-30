/**
 * D1 query helpers
 * ES5 JavaScript
 */

/**
 * Execute a query and return all rows.
 * @param {D1Database} db
 * @param {string} sql
 * @param {Array} params
 * @returns {Promise<Array>}
 */
function dbAll(db, sql, params) {
  params = params || [];
  var stmt = db.prepare(sql);
  if (params.length > 0) {
    stmt = stmt.bind.apply(stmt, params);
  }
  return stmt.all().then(function (result) {
    return result.results;
  }).catch(function (err) {
    throw new Error("dbAll failed: " + err.message);
  });
}

/**
 * Execute a query and return the first row.
 * @param {D1Database} db
 * @param {string} sql
 * @param {Array} params
 * @returns {Promise<Object|null>}
 */
function dbFirst(db, sql, params) {
  params = params || [];
  var stmt = db.prepare(sql);
  if (params.length > 0) {
    stmt = stmt.bind.apply(stmt, params);
  }
  return stmt.first().catch(function (err) {
    throw new Error("dbFirst failed: " + err.message);
  });
}

/**
 * Execute a statement (INSERT, UPDATE, DELETE).
 * @param {D1Database} db
 * @param {string} sql
 * @param {Array} params
 * @returns {Promise<Object>}
 */
function dbRun(db, sql, params) {
  params = params || [];
  var stmt = db.prepare(sql);
  if (params.length > 0) {
    stmt = stmt.bind.apply(stmt, params);
  }
  return stmt.run().catch(function (err) {
    throw new Error("dbRun failed: " + err.message);
  });
}

export { dbAll, dbFirst, dbRun };
