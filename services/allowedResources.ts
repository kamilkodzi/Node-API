import knex from "../config/databaseConfiguration";
import databaseSchema from "../config/databaseSchema";

const getAllowedResourceByNameAndId = async (
  allowedResourcesTableName,
  id = undefined
) => {
  const queryResults = await knex(allowedResourcesTableName)
    .select()
    .where((qb) => {
      if (id) {
        qb.where("id", id);
      }
    });

  return queryResults;
};

const addNewAllowedResource = async (
  tableName: string,
  allowedResourceName: string,
  comments: string = null
) => {
  let allowedResourceColumnName: string;
  let commentsColumnName: string;
  const systemTable = databaseSchema.systemsTable.tab_tableName;
  const sourceTable = databaseSchema.sourcesTable.tab_tableName;
  const customerTable = databaseSchema.customersTable.tab_tableName;

  switch (tableName) {
    case systemTable:
      allowedResourceColumnName = databaseSchema.systemsTable.col_systemName;
      commentsColumnName = databaseSchema.systemsTable.col_comments;
      break;
    case sourceTable:
      allowedResourceColumnName = databaseSchema.sourcesTable.col_systemName;
      commentsColumnName = databaseSchema.sourcesTable.col_comments;
      break;
    case customerTable:
      allowedResourceColumnName = databaseSchema.customersTable.col_systemName;
      commentsColumnName = databaseSchema.customersTable.col_comments;
      break;
  }

  const queryResults = await knex(tableName).insert({
    allowedResourceColumnName: allowedResourceName,
    commentsColumnName: comments,
  });
  return queryResults;
};

export = {
  getAllowedResourceByNameAndId,
  addNewAllowedResource,
};
