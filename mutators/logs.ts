import apiConfig from "../config/apiConfig";
import { httpBodyAndQueriesConsts } from "../config/consts";

const mutateGetQueryForLatestLogs = (req, res, next) => {
  let page = req.query[`${httpBodyAndQueriesConsts.query_page}`];
  let rowslimit = req.query[`${httpBodyAndQueriesConsts.query_rowslimit}`];
  const MaxRowsPerGetRequest = apiConfig.maximumRowsPerGetRequest;
  if (!page) page = 1;
  if (!rowslimit || rowslimit > MaxRowsPerGetRequest)
    rowslimit = MaxRowsPerGetRequest;
  req.query[`${httpBodyAndQueriesConsts.query_page}`] = page;
  req.query[`${httpBodyAndQueriesConsts.query_rowslimit}`] = rowslimit;
  next();
};

const logsSanitization = {
  mutateGetQueryForLatestLogs,
};

export default logsSanitization;
