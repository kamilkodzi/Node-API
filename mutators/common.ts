import consts from "../config/consts";
import apiConfig from "../config/apiConfig";

const changePageIfUndefined = (req, res, next) => {
  let page = req.query[`${consts.httpBodyAndQueries.query_page}`];
  let rowslimit = req.query[`${consts.httpBodyAndQueries.query_rowslimit}`];
  const MaxRowsPerGetRequest = apiConfig.maximumRowsPerGetRequest;
  const defaultRowsAmount = apiConfig.defaultAmountOfRowsPerGetRquest;

  if (!page) page = 1;
  if (rowslimit > MaxRowsPerGetRequest) rowslimit = MaxRowsPerGetRequest;
  if (!rowslimit) rowslimit = defaultRowsAmount;
  req.query[`${consts.httpBodyAndQueries.query_page}`] = page;
  req.query[`${consts.httpBodyAndQueries.query_rowslimit}`] = rowslimit;
  next();
};

const changeDescriptionIfUndefined = (req, res, next) => {
  let shortDescription =
    req.body[`${consts.httpBodyAndQueries.body_shortDescription}`];
  let longDescription =
    req.body[`${consts.httpBodyAndQueries.body_longDescription}`];

  if (!shortDescription) shortDescription = "";
  if (!longDescription) longDescription = "";

  req.body[`${consts.httpBodyAndQueries.body_shortDescription}`] =
    shortDescription;
  req.body[`${consts.httpBodyAndQueries.body_longDescription}`] =
    longDescription;

  next();
};

export = {
  changePageIfUndefined,
  changeDescriptionIfUndefined,
};
