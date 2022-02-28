import db from "../config/databaseConfiguration";
import { systemlogsDBModel as model } from "../config/databaseSchema";

export const getLastUpdate = async (
  customer: string,
  source: string,
  system: string
) => {
  const queryResults = await db
    .promise()
    .query(
      `SELECT ${model.col_logWasCreated} FROM ${model.tab_tableName} WHERE ${model.col_sendFromCustomer} = ? AND ${model.col_sendFromSource} = ? AND ${model.col_sendFromSystem} = ? ORDER BY ${model.col_logWasCreated} DESC LIMIT 1,1`,
      [customer, source, system]
    );
  return queryResults[0];
};

const lastUpdateService = {
  getLastUpdate,
};
export default lastUpdateService;
