import knex from "../config/databaseConfiguration";
import dbSchema from "../config/databaseSchema";
import consts from "../config/consts";
import { preventDuplicateIdGenerator } from "../helpers/utils";
const tb = dbSchema.systemlogsTablel;

const getLogs = async (offset: number, rowslimit: number) => {
  const queryResults = await knex(tb.tab_tableName)
    .select(
      tb.col_id,
      tb.col_logWasCreated,
      tb.col_logWasUploadedToApi,
      tb.col_sendFromSource,
      tb.col_sendFromSystem,
      tb.col_sendFromCustomer,
      tb.col_sendFromUser,
      tb.col_shortDescription,
      tb.col_longDescription,
      tb.col_comment
    )
    .where(tb.col_isShowingAnError, 0)
    .orWhereNull(tb.col_isShowingAnError)
    .orderBy(tb.col_logWasCreated, "desc")
    .limit(rowslimit)
    .offset(offset);
  return queryResults;
};

const addNewLog = async (req) => {
  const logWasCreated = req.body[consts.httpBodyAndQueries.logWasCreated];
  const logWasUploadedToApi = req.requestTime;
  const sendFromSource = req.body[consts.httpBodyAndQueries.sendFromSource];
  const sendFromSystem = req.body[consts.httpBodyAndQueries.sendFromSystem];
  const sendFromCustomer = req.body[consts.httpBodyAndQueries.sendFromCustomer];
  const sendFromUser = req.body[consts.httpBodyAndQueries.sendFromUser];
  const shortDescription = req.body[consts.httpBodyAndQueries.shortDescription];
  const longDescription = req.body[consts.httpBodyAndQueries.longDescription];
  const isShowingAnError = 0;
  const creationTimeInMiliseconds = new Date(logWasCreated).valueOf();
  const preventDuplicateId = preventDuplicateIdGenerator(
    creationTimeInMiliseconds,
    sendFromSystem,
    sendFromSource,
    sendFromCustomer,
    sendFromUser,
    isShowingAnError,
    shortDescription
  );

  const queryResults = await knex(tb.tab_tableName).insert({
    [tb.col_logWasCreated]: logWasCreated,
    [tb.col_logWasUploadedToApi]: logWasUploadedToApi,
    [tb.col_sendFromSource]: sendFromSource,
    [tb.col_sendFromSystem]: sendFromSystem,
    [tb.col_sendFromCustomer]: sendFromCustomer,
    [tb.col_sendFromUser]: sendFromUser,
    [tb.col_shortDescription]: shortDescription,
    [tb.col_longDescription]: longDescription,
    [tb.col_isShowingAnError]: isShowingAnError,
    [tb.col_preventDuplicateId2]: preventDuplicateId,
  });

  return queryResults;
};

export = {
  getLogs,
  addNewLog,
};
