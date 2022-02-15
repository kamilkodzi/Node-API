import db from "../config/databaseConfiguration";
import { loggerUsers as model } from "../config/databaseSchema";

const authenticateViaBasicAuth = async (username, password) => {
  try {
    const queryResults = await db
      .promise()
      .query(
        `SELECT * FROM ${model.tab_tableName} WHERE ${model.col_username} = ? AND ${model.col_password} = ?`,
        [username, password]
      );
    if (queryResults[0][0] !== []) {
      const user = queryResults[0][0];
      return user;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const userService = {
  authenticateViaBasicAuth,
};
