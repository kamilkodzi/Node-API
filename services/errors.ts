import db from "../config/databaseConfiguration";
import dbSchema from "../config/databaseSchema";
import { httpBodyAndQueriesConsts as httpQry } from "../config/consts";

const getErrors = async (offset: number, rowslimit: number) => {
  const queryResults = await db
    .promise()
    .query(
      `SELECT ${dbSchema.systemlogsTablel.col_id},${dbSchema.systemlogsTablel.col_logWasCreated},${dbSchema.systemlogsTablel.col_logWasUploadedToApi},${dbSchema.systemlogsTablel.col_sendFromSource},${dbSchema.systemlogsTablel.col_sendFromSystem},${dbSchema.systemlogsTablel.col_sendFromCustomer},${dbSchema.systemlogsTablel.col_sendFromUser},${dbSchema.systemlogsTablel.col_shortDescription},${dbSchema.systemlogsTablel.col_longDescription},${dbSchema.systemlogsTablel.col_errorCode},${dbSchema.systemlogsTablel.col_errorDescription},${dbSchema.systemlogsTablel.col_comment} FROM ${dbSchema.systemlogsTablel.tab_tableName} WHERE ${dbSchema.systemlogsTablel.col_isShowingAnError} = 1 ORDER BY ${dbSchema.systemlogsTablel.col_logWasCreated} DESC LIMIT ?,?`,
      [offset, rowslimit]
    );
  return queryResults[0];
};

const addNewError = async (req) => {
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
    creationTimeInMiliseconds +
    "." +
    sendFromSystem +
    "." +
    sendFromSource +
    "." +
    sendFromCustomer;

  const queryResults = await db
    .promise()
    .query(
      `INSERT INTO ${dbSchema.systemlogsTablel.tab_tableName} (${dbSchema.systemlogsTablel.col_logWasCreated},${dbSchema.systemlogsTablel.col_logWasUploadedToApi},${dbSchema.systemlogsTablel.col_sendFromSource},${dbSchema.systemlogsTablel.col_sendFromSystem},${dbSchema.systemlogsTablel.col_sendFromCustomer},${dbSchema.systemlogsTablel.col_sendFromUser},${dbSchema.systemlogsTablel.col_shortDescription},${dbSchema.systemlogsTablel.col_longDescription},${dbSchema.systemlogsTablel.col_errorCode},${dbSchema.systemlogsTablel.col_errorDescription},${dbSchema.systemlogsTablel.col_isShowingAnError},${dbSchema.systemlogsTablel.col_preventDuplicateId2}) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
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
        preventDuplicateId2,
      ]
    );
  return queryResults[0];
};

const errorsService = {
  getErrors,
  addNewError,
};
export default errorsService;
