import knex from "../config/databaseConfiguration";
import dbSchema from "../config/databaseSchema";

const tb = dbSchema.systemlogsTablel;

const getLastUpdate = async (
  customer: string,
  source: string,
  system: string
) => {
  const queryResults = await knex(tb.tab_tableName)
    .select(tb.col_logWasCreated)
    .where({
      [tb.col_sendFromCustomer]: customer,
      [tb.col_sendFromSource]: source,
      [tb.col_sendFromSystem]: system,
    })
    .orderBy(tb.col_logWasCreated, "desc")
    .limit(1);

  return queryResults;
};

export = {
  getLastUpdate,
};
