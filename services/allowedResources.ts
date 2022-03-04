import db from "../config/databaseConfiguration";
import dbSchema from "../config/databaseSchema";

const getSystems = async () => {
  const queryResults = await db
    .promise()
    .query(
      `SELECT ${dbSchema.systemsTable.col_systemName} FROM ${dbSchema.systemsTable.tab_tableName}`
    );
  return queryResults[0];
};

const getSources = async () => {
  const queryResults = await db
    .promise()
    .query(
      `SELECT ${dbSchema.sourcesTable.col_systemName} FROM ${dbSchema.sourcesTable.tab_tableName}`
    );
  return queryResults[0];
};

const getCustomers = async () => {
  const queryResults = await db
    .promise()
    .query(
      `SELECT ${dbSchema.customersTable.col_systemName} FROM ${dbSchema.customersTable.tab_tableName}`
    );
  return queryResults[0];
};

export = {
  getSystems,
  getSources,
  getCustomers,
};
