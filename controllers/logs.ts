import getOffset from "../helpers/offsetQueries";
import { addNewLogToDatabase, getLatestLogsQuery } from "../services/logs";
import { httpBodyAndQueriesConsts as httpQry } from "../config/consts";
import {
  generateGetResponse,
  generatePostResponse,
} from "../helpers/apiAnswerGenerator";

const redirectToLogsRoute = (req, res, next) => {
  const page = httpQry.query_page;
  const rowlimits = httpQry.query_rowslimit;
  res.redirect(`/logs?${page}=1&${rowlimits}=1`);
};

const getLatestCreatedLogs = async (req, res, next) => {
  const page = req.query[httpQry.query_page];
  const rowslimit = req.query[httpQry.query_rowslimit];
  const pageTurnedInToOffset = getOffset(page, rowslimit);
  const queryResults: [] = await getLatestLogsQuery(
    pageTurnedInToOffset,
    rowslimit
  ).then((data: []) => {
    return data;
  });
  const queryResultsLenght = queryResults.length;
  const apiAnswer = generateGetResponse(
    queryResults,
    rowslimit,
    page,
    queryResultsLenght
  );
  res.status(200).send(apiAnswer);
};

const addNewLog = async (req, res, next) => {
  const queryResults = await addNewLogToDatabase(req);
  const apiAnswer = generatePostResponse(queryResults);
  res.status(201).send(apiAnswer);
};

export = {
  getLatestCreatedLogs,
  redirectToLogsRoute,
  addNewLog,
};
