import db from "../config/databaseConfiguration";
import dbSchema from "../config/databaseSchema";
import consts from "../config/consts";

const getLogs = async (offset: number, rowslimit: number) => {
  const queryResults = await db
    .promise()
    .query(
      `SELECT ${dbSchema.systemlogsTablel.col_id},${dbSchema.systemlogsTablel.col_logWasCreated},${dbSchema.systemlogsTablel.col_logWasUploadedToApi},${dbSchema.systemlogsTablel.col_sendFromSource},${dbSchema.systemlogsTablel.col_sendFromSystem},${dbSchema.systemlogsTablel.col_sendFromCustomer},${dbSchema.systemlogsTablel.col_sendFromUser},${dbSchema.systemlogsTablel.col_shortDescription},${dbSchema.systemlogsTablel.col_longDescription},${dbSchema.systemlogsTablel.col_comment} FROM ${dbSchema.systemlogsTablel.tab_tableName} WHERE ${dbSchema.systemlogsTablel.col_isShowingAnError} is null or ${dbSchema.systemlogsTablel.col_isShowingAnError} = 0 ORDER BY ${dbSchema.systemlogsTablel.col_logWasCreated} DESC LIMIT ?,?`,
      [offset, rowslimit]
    );
  return queryResults[0];
};

const addNewLog = async (req) => {
  const logWasCreated = req.body[consts.httpBodyAndQueries.body_logWasCreated];
  const logWasUploadedToApi = req.requestTime;
  const sendFromSource =
    req.body[consts.httpBodyAndQueries.body_sendFromSource];
  const sendFromSystem =
    req.body[consts.httpBodyAndQueries.body_sendFromSystem];
  const sendFromCustomer =
    req.body[consts.httpBodyAndQueries.body_sendFromCustomer];
  const sendFromUser = req.body[consts.httpBodyAndQueries.body_sendFromUser];
  const shortDescription =
    req.body[consts.httpBodyAndQueries.body_shortDescription];
  const longDescription =
    req.body[consts.httpBodyAndQueries.body_longDescription];
  const isShowingAnError = 0;
  const creationTimeInMiliseconds = new Date(logWasCreated).valueOf();
  const preventDuplicateId2 =
    creationTimeInMiliseconds +
    "." +
    sendFromSystem +
    "." +
    sendFromSource +
    "." +
    sendFromCustomer +
    "." +
    sendFromUser +
    "." +
    isShowingAnError +
    "." +
    shortDescription;

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

export = {
  getLogs,
  addNewLog,
};
