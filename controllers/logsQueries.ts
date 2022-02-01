import db from "../config/database";
import apiConfig from "../config/apiConfig";
import getOffset from "../helpers/offsetQueries";

async function getLatestLogs(query: any) {
  const MaxRowsPerGetRequest = apiConfig.maximumRowsPerGetRequest;
  let { page, rowsPerPage } = query;
  if (!page) page = 1;
  if (!rowsPerPage) rowsPerPage = MaxRowsPerGetRequest;
  const offset = getOffset(page, rowsPerPage);

  const rows = await db
    .promise()
    .query(`SELECT * FROM systemlogs ORDER BY id DESC LIMIT ?,?`, [
      Number(offset),
      Number(rowsPerPage),
    ]);
  const data = rows[0];
  const meta = { page };
  return {
    data,
    meta,
  };
}

export default getLatestLogs;
