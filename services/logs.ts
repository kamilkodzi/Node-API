import db from "../config/databaseConfiguration";
import { systemlogsDBModel as model } from "../config/databaseSchema";
import { httpBodyAndQueriesConsts as httpQry } from "../config/consts";

export const getLatestLogsQuery = async (offset: number, rowslimit: number) => {
  const queryResults = await db
    .promise()
    .query(
      `SELECT ${model.col_id},${model.col_logWasCreated},${model.col_logWasUploadedToApi},${model.col_sendFromSource},${model.col_sendFromSystem},${model.col_sendFromCustomer},${model.col_sendFromUser},${model.col_shortDescription},${model.col_longDescription},${model.col_comment} FROM ${model.tab_tableName} WHERE ${model.col_isShowingAnError} is null or ${model.col_isShowingAnError} = 0 ORDER BY ${model.col_logWasCreated} DESC LIMIT ?,?`,
      [offset, rowslimit]
    );
  return queryResults[0];
};

export const addNewLogToDatabase = async (req) => {
  const logWasCreated = req.body[httpQry.body_logWasCreated];
  const logWasUploadedToApi = req.requestTime;
  const sendFromSource = req.body[httpQry.body_sendFromSource];
  const sendFromSystem = req.body[httpQry.body_sendFromSystem];
  const sendFromCustomer = req.body[httpQry.body_sendFromCustomer];
  const sendFromUser = req.body[httpQry.body_sendFromUser];
  const shortDescription = req.body[httpQry.body_shortDescription];
  const longDescription = req.body[httpQry.body_longDescription];
  const isShowingAnError = 0;

  const queryResults = await db
    .promise()
    .query(
      `INSERT INTO ${model.tab_tableName} (${model.col_logWasCreated},${model.col_logWasUploadedToApi},${model.col_sendFromSource},${model.col_sendFromSystem},${model.col_sendFromCustomer},${model.col_sendFromUser},${model.col_shortDescription},${model.col_longDescription},${model.col_isShowingAnError}) VALUES('${logWasCreated}','${logWasUploadedToApi}','${sendFromSource}','${sendFromSystem}','${sendFromCustomer}','${sendFromUser}','${shortDescription}','${longDescription}','${isShowingAnError}');`
    );
  return queryResults[0];
};
