import getOffset from "../helpers/offsetQueries";
import { systemlogsDBModel } from "../config/databaseSchema";
import { addNewLogToDatabase, getLatestLogsQuery } from "../services/logs";
import { httpBodyAndQueriesConsts as httpQry } from "../config/consts";
import { apiResponseText } from "../config/consts";

const getLatestCreatedLogs = async (req, res, next) => {
  const page = req.query[httpQry.query_page];
  const rowslimit = req.query[httpQry.query_rowslimit];
  const pageTurnedInToOffset = getOffset(page, rowslimit);
  const responseDataText = apiResponseText.get_responseData;
  const resonseMetaText = apiResponseText.get_responseMeta;
  const responsePageText = apiResponseText.get_responsePage;
  const queryResults = await getLatestLogsQuery(
    pageTurnedInToOffset,
    rowslimit,
    systemlogsDBModel.col_logWasCreated
  );
  const apiAnswer = {
    [responseDataText]: queryResults,
    [resonseMetaText]: { [responsePageText]: page },
  };
  res.status(200).send(apiAnswer);
};

const addNewLog = async (req, res, next) => {
  const isShowingAnError = 0;
  const requiredQueryData = {
    logWasCreated: req.body[httpQry.body_logWasCreated],
    logWasUploadedToApi: req.requestTime,
    sendFromSource: req.body[httpQry.body_sendFromSource],
    sendFromSystem: req.body[httpQry.body_sendFromSystem],
    sendFromCustomer: req.body[httpQry.body_sendFromCustomer],
    sendFromUser: req.body[httpQry.body_sendFromUser],
    shortDescription: req.body[httpQry.body_shortDescription],
    longDescription: req.body[httpQry.body_longDescription],
    isShowingAnError: [isShowingAnError],
  };

  const responseIdText = apiResponseText.post_responseId;
  const queryResults = await addNewLogToDatabase(requiredQueryData);
  const apiAnswer = {
    [responseIdText]: queryResults["insertId"],
  };
  res.status(200).send(apiAnswer);
};

export = {
  getLatestCreatedLogs,
  addNewLog,
};
