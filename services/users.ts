import knex from "../database/databaseConfiguration";
import dbSchema from "../database/databaseSchema";
const tb = dbSchema.loggerusersTable;

const authenticateViaBasicAuth = async (username, password) => {
  try {
    const queryResults = await knex(tb.tab_tableName)
      .where({
        [tb.col_username]: username,
        [tb.col_password]: password,
      })
      .then((user) => {
        if (!user[0]) return null;
        return user[0];
      });
    return queryResults;
  } catch (error) {
    return error;
  }
};

export = {
  authenticateViaBasicAuth,
};
