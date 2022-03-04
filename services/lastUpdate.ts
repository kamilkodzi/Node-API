import db from "../config/databaseConfiguration";
import dbSchema from "../config/databaseSchema";

const getLastUpdate = async (
  customer: string,
  source: string,
  system: string
) => {
  const queryResults = await db
    .promise()
    .query(
      `SELECT ${dbSchema.systemlogsTablel.col_logWasCreated} FROM ${dbSchema.systemlogsTablel.tab_tableName} WHERE ${dbSchema.systemlogsTablel.col_sendFromCustomer} = ? AND ${dbSchema.systemlogsTablel.col_sendFromSource} = ? AND ${dbSchema.systemlogsTablel.col_sendFromSystem} = ? ORDER BY ${dbSchema.systemlogsTablel.col_logWasCreated} DESC LIMIT 1,1`,
      [customer, source, system]
    );
  return queryResults[0];
};

export = {
  getLastUpdate,
};
