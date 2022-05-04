import getOffset from "../helpers/offsetQueries";
import logsService from "../services/logs";
import consts from "../config/consts";
import apiResponseCreator from "../helpers/apiResponseGenerator";

const redirectToLogsRoute = (req, res, next) => {
  const page = consts.httpBodyAndQueries.page;
  const rowlimits = consts.httpBodyAndQueries.rowslimit;
  res.header("Authorization", req.header["Authorization"]);
  res.user = req.user;
  res.redirect(`/logs?${page}=1&${rowlimits}=1`);
};

const getLatestCreatedLogs = async (req, res, next) => {
  const page = req.query[consts.httpBodyAndQueries.page];
  const rowslimit = req.query[consts.httpBodyAndQueries.rowslimit];
  const offset = getOffset(page, rowslimit);
  const queryParams = req.query;
  const queryResults: [] = await logsService
    .getLogs({
      offset,
      rowslimit,
      queryParams,
    })
    .then((data: []) => {
      return data;
    });
  const queryResultsLenght = queryResults.length;
  const apiAnswer = apiResponseCreator.createGetResponse(
    queryResults,
    rowslimit,
    page,
    queryResultsLenght
  );
  res.status(200).send(apiAnswer);
};

const addNewLog = async (req, res, next) => {
  const queryResults = await logsService.addNewLog(req);
  const apiAnswer = apiResponseCreator.createPostResponse(queryResults);
  res.status(201).send(apiAnswer);
};

export = {
  getLatestCreatedLogs,
  redirectToLogsRoute,
  addNewLog,
};
