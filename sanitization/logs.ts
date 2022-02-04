import apiConfig from "../config/apiConfig";
import { httpBodyAndQueriesConsts } from "../config/consts";

const forGettingLatestLogs = (req, res, next) => {
  let page = req.query[`${httpBodyAndQueriesConsts.query_page}`];
  let rowslimit = req.query[`${httpBodyAndQueriesConsts.query_rowslimit}`];
  const MaxRowsPerGetRequest = apiConfig.maximumRowsPerGetRequest;
  if (!page) page = 1;
  if (!rowslimit || rowslimit > MaxRowsPerGetRequest)
    rowslimit = MaxRowsPerGetRequest;
  //dodać funkcje co nadpisze req.query ? czy nie dodawać pomyślec
  req.query[`${httpBodyAndQueriesConsts.query_page}`] = page;
  req.query[`${httpBodyAndQueriesConsts.query_rowslimit}`] = rowslimit;
  next();
};

const logsSanitization = {
  forGettingLatestLogs,
};

export default logsSanitization;
