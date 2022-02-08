import getOffset from "../helpers/offsetQueries";
import { systemlogsDBModel } from "../config/databaseSchema";
import {
  getLatestErrorsQuery,
  addNewErrorToDatabase,
} from "../services/errors";
import { httpBodyAndQueriesConsts as httpQry } from "../config/consts";
import { apiResponseText } from "../config/consts";

const getLatestCreatedErrors = async (req, res, next) => {
  const page = req.query[httpQry.query_page];
  const rowslimit = req.query[httpQry.query_rowslimit];
  const pageTurnedInToOffset = getOffset(page, rowslimit);
  const responseDataText = apiResponseText.get_responseData;
  const resonseMetaText = apiResponseText.get_responseMeta;
  const responsePageText = apiResponseText.get_responsePage;
  const queryResults = await getLatestErrorsQuery(
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

const addNewError = async (req, res, next) => {
  const isShowingAnError = 1;
  const requiredQueryData = {
    logWasCreated: req.body[httpQry.body_logWasCreated],
    logWasUploadedToApi: req.requestTime,
    sendFromSource: req.body[httpQry.body_sendFromSource],
    sendFromSystem: req.body[httpQry.body_sendFromSystem],
    sendFromCustomer: req.body[httpQry.body_sendFromCustomer],
    sendFromUser: req.body[httpQry.body_sendFromUser],
    shortDescription: req.body[httpQry.body_shortDescription],
    longDescription: req.body[httpQry.body_longDescription],
    errorCode: req.body[httpQry.body_errorCode],
    errorDescription: req.body[httpQry.body_errorDescription],
    isShowingAnError: [isShowingAnError],
  };
  const responseIdText = apiResponseText.post_responseId;
  const queryResults = await addNewErrorToDatabase(requiredQueryData);
  const apiAnswer = {
    [responseIdText]: queryResults["insertId"],
  };
  res.status(200).send(apiAnswer);
};

export = {
  getLatestCreatedErrors,
  addNewError,
};
