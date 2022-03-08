import db from "../config/databaseConfiguration";

const getAllowedResourceByNameAndId = async (
  allowedResourcesTableName,
  id = undefined
) => {
  const filterById = id ? "WHERE id=?" : "";
  const queryResults = await db
    .promise()
    .query(`SELECT * FROM ${allowedResourcesTableName} ${filterById}`, [id]);
  return queryResults[0];
};

export = {
  getAllowedResourceByNameAndId,
};
