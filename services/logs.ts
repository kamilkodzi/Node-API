import db from "../config/databaseConfiguration";
import { systemlogsDBModel as model } from "../models/logs";

export const getLatestLogsQuery = async (
  offset: number,
  rowslimit: number,
  sortBy: string
) => {
  const queryResults = await db
    .promise()
    .query(
      `SELECT * FROM ${model.tab_tableName} ORDER BY ${sortBy} DESC LIMIT ?,?`,
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
  isShowingAnError,
  errorCode,
  errorDescription,
}) => {
  const queryResults = await db
    .promise()
    .query(
      `INSERT INTO ${model.tab_tableName} (${model.col_logWasCreated},${model.col_logWasUploadedToApi},${model.col_sendFromSource},${model.col_sendFromSystem},${model.col_sendFromCustomer},${model.col_sendFromUser},${model.col_shortDescription},${model.col_longDescription},${model.col_isShowingAnError},${model.col_errorCode},${model.col_errorDescription}) VALUES('${logWasCreated}','${logWasUploadedToApi}','${sendFromSource}','${sendFromSystem}','${sendFromCustomer}','${sendFromUser}','${shortDescription}','${longDescription}','${isShowingAnError}','${errorCode}','${errorDescription}');`
    );
  return queryResults[0];
};
