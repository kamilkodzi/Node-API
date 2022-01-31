import db from "../config/database";
import apiConfig from "../config/apiConfig";

async function getLatestLogs(query: any) {
  const MaxRowsPerGetRequest = apiConfig.maximumRowsPerGetRequest;
  let { page, rowsPerPage } = query;
  if (!page) page = 1;
  if (!rowsPerPage) rowsPerPage = MaxRowsPerGetRequest;
  const rows = await db
    .promise()
    .query(`SELECT * FROM systemlogs ORDER BY id DESC LIMIT ?,?`, [
      Number(page),
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
