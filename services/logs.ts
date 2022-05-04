import knex from "../database/databaseConfiguration";
import dbSchema from "../database/databaseSchema";
import consts from "../config/consts";
import { preventDuplicateIdGenerator } from "../helpers/utils";
const tb = dbSchema.systemlogsTablel;

const getLogs = async (queryParams) => {
  const rowslimit = queryParams.rowslimit;
  const offset = queryParams.offset;
  const id = queryParams.queryParams[consts.httpBodyAndQueries.id];
  const dateFrom =
    queryParams.queryParams[consts.httpBodyAndQueries.logWasCreatedFrom];
  const dateTo =
    queryParams.queryParams[consts.httpBodyAndQueries.logWasCreatedTo];
  const sendFromSource =
    queryParams.queryParams[consts.httpBodyAndQueries.sendFromSource];
  const sendFromSystem =
    queryParams.queryParams[consts.httpBodyAndQueries.sendFromSystem];
  const sendFromCustomer =
    queryParams.queryParams[consts.httpBodyAndQueries.sendFromCustomer];
  const sendFromUser =
    queryParams.queryParams[consts.httpBodyAndQueries.sendFromUser];
  const shortDescription =
    queryParams.queryParams[consts.httpBodyAndQueries.shortDescription];
  const longDescription =
    queryParams.queryParams[consts.httpBodyAndQueries.longDescription];
  const comment = queryParams.queryParams[consts.httpBodyAndQueries.comments];

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
    .where((qb) => {
      qb.where(tb.col_isShowingAnError, 0);
      qb.orWhereNull(tb.col_isShowingAnError);
    })
    .andWhere((qb) => {
      if (id) {
        qb.where(tb.col_id, "=", id);
      }
      if (dateFrom) {
        qb.where(tb.col_logWasCreated, ">=", dateFrom);
      }
      if (dateTo) {
        qb.where(tb.col_logWasCreated, "<=", dateTo);
      }
      if (sendFromCustomer) {
        qb.where(tb.col_sendFromCustomer, "=", sendFromCustomer);
      }
      if (sendFromSource) {
        qb.where(tb.col_sendFromSource, "=", sendFromSource);
      }
      if (sendFromSystem) {
        qb.where(tb.col_sendFromSystem, "=", sendFromSystem);
      }
      if (sendFromUser) {
        qb.where(tb.col_sendFromUser, "like", `%${sendFromUser}%`);
      }
      if (shortDescription) {
        qb.where(tb.col_errorCode, "like", `%${shortDescription}%`);
      }
      if (longDescription) {
        qb.where(tb.col_errorDescription, "like", `%${longDescription}%`);
      }
      if (comment) {
        qb.where(tb.col_comment, "like", `%${comment}%`);
      }
    })
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
