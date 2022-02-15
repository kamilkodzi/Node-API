import db from "../config/databaseConfiguration";
import { systemlogsDBModel as model } from "../config/databaseSchema";
import { httpBodyAndQueriesConsts as httpQry } from "../config/consts";

export const getLatestErrorsQuery = async (
  offset: number,
  rowslimit: number
) => {
  const queryResults = await db
    .promise()
    .query(
      `SELECT ${model.col_id},${model.col_logWasCreated},${model.col_logWasUploadedToApi},${model.col_sendFromSource},${model.col_sendFromSystem},${model.col_sendFromCustomer},${model.col_sendFromUser},${model.col_shortDescription},${model.col_longDescription},${model.col_errorCode},${model.col_errorDescription},${model.col_comment} FROM ${model.tab_tableName} WHERE ${model.col_isShowingAnError} = 1 ORDER BY ${model.col_logWasCreated} DESC LIMIT ?,?`,
      [offset, rowslimit]
    );
  return queryResults[0];
};

export const addNewErrorToDatabase = async (req) => {
  const logWasCreated = req.body[httpQry.body_logWasCreated];
  const logWasUploadedToApi = req.requestTime;
  const sendFromSource = req.body[httpQry.body_sendFromSource];
  const sendFromSystem = req.body[httpQry.body_sendFromSystem];
  const sendFromCustomer = req.body[httpQry.body_sendFromCustomer];
  const sendFromUser = req.body[httpQry.body_sendFromUser];
  const shortDescription = req.body[httpQry.body_shortDescription];
  const longDescription = req.body[httpQry.body_longDescription];
  const errorCode = req.body[httpQry.body_errorCode];
  const errorDescription = req.body[httpQry.body_errorDescription];
  const isShowingAnError = 1;
  const creationTimeInMiliseconds = new Date(logWasCreated).valueOf();
  const preventDuplicateId2 =
    creationTimeInMiliseconds + "." + sendFromSystem + "." + sendFromCustomer;

  const queryResults = await db
    .promise()
    .query(
      `INSERT INTO ${model.tab_tableName} (${model.col_logWasCreated},${model.col_logWasUploadedToApi},${model.col_sendFromSource},${model.col_sendFromSystem},${model.col_sendFromCustomer},${model.col_sendFromUser},${model.col_shortDescription},${model.col_longDescription},${model.col_errorCode},${model.col_errorDescription},${model.col_isShowingAnError},${model.col_preventDuplicateId2}) VALUES('${logWasCreated}','${logWasUploadedToApi}','${sendFromSource}','${sendFromSystem}','${sendFromCustomer}','${sendFromUser}','${shortDescription}','${longDescription}','${errorCode}','${errorDescription}','${isShowingAnError}','${preventDuplicateId2}');`
    );
  return queryResults[0];
};
