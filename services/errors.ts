import db from "../config/databaseConfiguration";
import { systemlogsDBModel as model } from "../config/databaseSchema";

export const getLatestErrorsQuery = async (
  offset: number,
  rowslimit: number,
  sortBy: string
) => {
  const queryResults = await db
    .promise()
    .query(
      `SELECT ${model.col_id},${model.col_logWasCreated},${model.col_logWasUploadedToApi},${model.col_sendFromSource},${model.col_sendFromSystem},${model.col_sendFromCustomer},${model.col_sendFromUser},${model.col_shortDescription},${model.col_longDescription},${model.col_errorCode},${model.col_errorDescription},${model.col_comment} FROM ${model.tab_tableName} WHERE ${model.col_isShowingAnError} = 1 ORDER BY ${sortBy} DESC LIMIT ?,?`,
      [offset, rowslimit]
    );
  return queryResults[0];
};

export const addNewErrorToDatabase = async ({
  logWasCreated,
  logWasUploadedToApi,
  sendFromSource,
  sendFromSystem,
  sendFromCustomer,
  sendFromUser,
  shortDescription,
  longDescription,
  errorCode,
  errorDescription,
  isShowingAnError,
}) => {
  const queryResults = await db
    .promise()
    .query(
      `INSERT INTO ${model.tab_tableName} (${model.col_logWasCreated},${model.col_logWasUploadedToApi},${model.col_sendFromSource},${model.col_sendFromSystem},${model.col_sendFromCustomer},${model.col_sendFromUser},${model.col_shortDescription},${model.col_longDescription},${model.col_errorCode},${model.col_errorDescription},${model.col_isShowingAnError}) VALUES('${logWasCreated}','${logWasUploadedToApi}','${sendFromSource}','${sendFromSystem}','${sendFromCustomer}','${sendFromUser}','${shortDescription}','${longDescription}','${errorCode}','${errorDescription}','${isShowingAnError}');`
    );
  return queryResults[0];
};
