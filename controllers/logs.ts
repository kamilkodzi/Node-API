import db from "../config/databaseConfiguration";
import apiConfig from "../config/apiConfig";
import getOffset from "../helpers/offsetQueries";

const getLatestCreatedLogs = async (query: {
  page: number;
  rowsPerPage: number;
}) => {
  let { page, rowsPerPage } = query;
  const MaxRowsPerGetRequest = apiConfig.maximumRowsPerGetRequest;
  if (!page) page = 1;
  if (!rowsPerPage) rowsPerPage = MaxRowsPerGetRequest;
  const offset = getOffset(page, rowsPerPage);

  const rows = await db
    .promise()
    .query(`SELECT * FROM systemlogs ORDER BY id DESC LIMIT ?,?`, [
      offset,
      rowsPerPage,
    ]);
  const data = rows[0];
  const meta = { page };
  return {
    data,
    meta,
  };
};

const getLatestUploadedLogs = () => {};

export { getLatestCreatedLogs, getLatestUploadedLogs };
