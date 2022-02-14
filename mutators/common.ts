import { httpBodyAndQueriesConsts as httpQry } from "../config/consts";
import apiConfig from "../config/apiConfig";

export const mutateFirstPageAndPageIfUndefined = (req, res, next) => {
  let page = req.query[`${httpQry.query_page}`];
  let rowslimit = req.query[`${httpQry.query_rowslimit}`];
  const MaxRowsPerGetRequest = apiConfig.maximumRowsPerGetRequest;
  const defaultRowsAmount = apiConfig.defaultAmountOfRowsPerGetRquest;

  if (!page) page = 1;
  if (rowslimit > MaxRowsPerGetRequest) rowslimit = MaxRowsPerGetRequest;
  if (!rowslimit) rowslimit = defaultRowsAmount;
  req.query[`${httpQry.query_page}`] = page;
  req.query[`${httpQry.query_rowslimit}`] = rowslimit;
  next();
};

export const mutatePostQueryDescriptionsIfUndefined = (req, res, next) => {
  let shortDescription = req.body[`${httpQry.body_shortDescription}`];
  let longDescription = req.body[`${httpQry.body_longDescription}`];

  if (!shortDescription) shortDescription = "";
  if (!longDescription) longDescription = "";

  req.body[`${httpQry.body_shortDescription}`] = shortDescription;
  req.body[`${httpQry.body_longDescription}`] = longDescription;

  next();
};
