import db from "../config/databaseConfiguration";
import { systemlogsDBModel as model } from "../config/databaseSchema";

export const getLatestLogsQuery = async (
  offset: number,
  rowslimit: number,
  sortBy: string,
) => {
  const queryResults = await db
    .promise()
    .query(
      `SELECT ${model.col_id},${model.col_logWasCreated},${model.col_logWasUploadedToApi},${model.col_sendFromSource},${model.col_sendFromSystem},${model.col_sendFromCustomer},${model.col_sendFromUser},${model.col_shortDescription},${model.col_longDescription},${model.col_comment} FROM ${model.tab_tableName} WHERE ${model.col_isShowingAnError} is null or ${model.col_isShowingAnError} = 0 ORDER BY ${sortBy} DESC LIMIT ?,?`,
      [offset, rowslimit]
    );
  return queryResults[0];
};

export const addNewLogToDatabase = async ({
  logWasCreated,
  logWasUploadedToApi,
  sendFromSource,
  sendFromSystem,
  sendFromCustomer,
  sendFromUser,
  shortDescription,
  longDescription,
}) => {
  const queryResults = await db
    .promise()
    .query(
      `INSERT INTO ${model.tab_tableName} (${model.col_logWasCreated},${model.col_logWasUploadedToApi},${model.col_sendFromSource},${model.col_sendFromSystem},${model.col_sendFromCustomer},${model.col_sendFromUser},${model.col_shortDescription},${model.col_longDescription}) VALUES('${logWasCreated}','${logWasUploadedToApi}','${sendFromSource}','${sendFromSystem}','${sendFromCustomer}','${sendFromUser}','${shortDescription}','${longDescription}');`
    );
  return queryResults[0];
};
