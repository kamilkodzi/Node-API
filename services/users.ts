// import db from "../config/databaseConfiguration";
// import dbSchema from "../config/databaseSchema";

// const authenticateViaBasicAuth = async (username, password) => {
//   try {
//     const queryResults = await db
//       .promise()
//       .query(
//         `SELECT * FROM ${dbSchema.loggerusersTable.tab_tableName} WHERE ${dbSchema.loggerusersTable.col_username} = ? AND ${dbSchema.loggerusersTable.col_password} = ?`,
//         [username, password]
//       );
//     if (queryResults[0][0] !== []) {
//       const user = queryResults[0][0];
//       return user;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     return error;
//   }
// };

// export = {
//   authenticateViaBasicAuth,
// };
