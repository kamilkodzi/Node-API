import db from "../config/databaseConfiguration";
import { systemlogsSchema } from "../models/logs";

export const getLatestLogsQuery = async (
  offset: number,
  rowslimit: number,
  sortBy: string
) => {
  const tableName: string = systemlogsSchema.tab_tableName;
  const queryResults = await db
    .promise()
    .query(`SELECT * FROM ${tableName} ORDER BY ${sortBy} DESC LIMIT ?,?`, [
      offset,
      rowslimit,
    ]);
  return queryResults[0];
};
