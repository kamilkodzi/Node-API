import apiConfig from "../config/apiConfig";
import { httpBodyAndQueriesConsts as httpQry } from "../config/consts";

const mutateGetQueryForLatestLogs = (req, res, next) => {
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
const mutatePostQueryAddNewLog = (req, res, next) => {
  let sendFromSource = req.body[`${httpQry.body_sendFromSource}`];
  let sendFromSystem = req.body[`${httpQry.body_sendFromSystem}`];
  let sendFromCustomer = req.body[`${httpQry.body_sendFromCustomer}`];
  let sendFromUser = req.body[`${httpQry.body_sendFromUser}`];
  let shortDescription = req.body[`${httpQry.body_shortDescription}`];
  let longDescription = req.body[`${httpQry.body_longDescription}`];

  sendFromSource = sendFromSource.toLowerCase();
  sendFromSystem = sendFromSystem.toLowerCase();
  sendFromCustomer = sendFromCustomer.toLowerCase();
  sendFromUser = sendFromUser.toLowerCase();
  if (!shortDescription) shortDescription = "";
  if (!longDescription) longDescription = "";

  req.body[`${httpQry.body_sendFromSource}`] = sendFromSource;
  req.body[`${httpQry.body_sendFromSystem}`] = sendFromSystem;
  req.body[`${httpQry.body_sendFromCustomer}`] = sendFromCustomer;
  req.body[`${httpQry.body_sendFromUser}`] = sendFromUser;
  req.body[`${httpQry.body_shortDescription}`] = shortDescription;
  req.body[`${httpQry.body_longDescription}`] = longDescription;
  next();
};

const logsMutations = {
  mutateGetQueryForLatestLogs,
  mutatePostQueryAddNewLog,
};

export default logsMutations;
