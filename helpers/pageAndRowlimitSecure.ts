import apiConfig from "../config/apiConfig";
import { httpBodyAndQueriesConsts as httpQry } from "../config/consts";

export const maxRowsAndFirstPageSecure = (req, res, next) => {
    let page = req.query[`${httpQry.query_page}`];
    let rowslimit = req.query[`${httpQry.query_rowslimit}`];
    const MaxRowsPerGetRequest = apiConfig.maximumRowsPerGetRequest;
    if (!page) page = 1;
    if (!rowslimit || rowslimit > MaxRowsPerGetRequest)
      rowslimit = MaxRowsPerGetRequest;
    req.query[`${httpQry.query_page}`] = page;
    req.query[`${httpQry.query_rowslimit}`] = rowslimit;
    next();
  };