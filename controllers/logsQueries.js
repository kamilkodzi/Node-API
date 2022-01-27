const db = require("../config/database");
const helper = require("../helpers/offsetQueries");

async function getAllRows(page, rowsLimit) {
  // const offset = helper.getOffset(page, rowsLimit);
  const rows = await db
    .promise()
    .query(`SELECT * FROM systemlogs LIMIT ?,?`, [page, rowsLimit]);
  const data = helper.emptyOrRows(rows[0]);
  const meta = { page };
  return {
    data,
    meta,
  };
}

module.exports = {
  getAllRows,
};
