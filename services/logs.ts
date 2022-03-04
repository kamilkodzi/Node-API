import db from "../config/databaseConfiguration";
import dbSchema from "../config/databaseSchema";
import { httpBodyAndQueriesConsts as httpQry } from "../config/consts";

export const getLogs = async (offset: number, rowslimit: number) => {
  const queryResults = await db
    .promise()
    .query(
      `SELECT ${dbSchema.systemlogsTablel.col_id},${dbSchema.systemlogsTablel.col_logWasCreated},${dbSchema.systemlogsTablel.col_logWasUploadedToApi},${dbSchema.systemlogsTablel.col_sendFromSource},${dbSchema.systemlogsTablel.col_sendFromSystem},${dbSchema.systemlogsTablel.col_sendFromCustomer},${dbSchema.systemlogsTablel.col_sendFromUser},${dbSchema.systemlogsTablel.col_shortDescription},${dbSchema.systemlogsTablel.col_longDescription},${dbSchema.systemlogsTablel.col_comment} FROM ${dbSchema.systemlogsTablel.tab_tableName} WHERE ${dbSchema.systemlogsTablel.col_isShowingAnError} is null or ${dbSchema.systemlogsTablel.col_isShowingAnError} = 0 ORDER BY ${dbSchema.systemlogsTablel.col_logWasCreated} DESC LIMIT ?,?`,
      [offset, rowslimit]
    );
  return queryResults[0];
};

export const addNewLog = async (req) => {
  const logWasCreated = req.body[httpQry.body_logWasCreated];
  const logWasUploadedToApi = req.requestTime;
  const sendFromSource = req.body[httpQry.body_sendFromSource];
  const sendFromSystem = req.body[httpQry.body_sendFromSystem];
  const sendFromCustomer = req.body[httpQry.body_sendFromCustomer];
  const sendFromUser = req.body[httpQry.body_sendFromUser];
  const shortDescription = req.body[httpQry.body_shortDescription];
  const longDescription = req.body[httpQry.body_longDescription];
  const isShowingAnError = 0;
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
      `INSERT INTO ${dbSchema.systemlogsTablel.tab_tableName} (${dbSchema.systemlogsTablel.col_logWasCreated},${dbSchema.systemlogsTablel.col_logWasUploadedToApi},${dbSchema.systemlogsTablel.col_sendFromSource},${dbSchema.systemlogsTablel.col_sendFromSystem},${dbSchema.systemlogsTablel.col_sendFromCustomer},${dbSchema.systemlogsTablel.col_sendFromUser},${dbSchema.systemlogsTablel.col_shortDescription},${dbSchema.systemlogsTablel.col_longDescription},${dbSchema.systemlogsTablel.col_isShowingAnError},${dbSchema.systemlogsTablel.col_preventDuplicateId2}) VALUES(?,?,?,?,?,?,?,?,?,?)`,
      [
        logWasCreated,
        logWasUploadedToApi,
        sendFromSource,
        sendFromSystem,
        sendFromCustomer,
        sendFromUser,
        shortDescription,
        longDescription,
        isShowingAnError,
        preventDuplicateId2,
      ]
    );
  return queryResults[0];
};

const logsService = {
  getLogs,
  addNewLog,
};
export default logsService;
