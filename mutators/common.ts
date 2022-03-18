import consts from "../config/consts";
import apiConfig from "../config/apiConfig";

const changePageIfUndefined = (req, res, next) => {
  let page = req.query[`${consts.httpBodyAndQueries.page}`];
  let rowslimit = req.query[`${consts.httpBodyAndQueries.rowslimit}`];
  const MaxRowsPerGetRequest = apiConfig.maximumRowsPerGetRequest;
  const defaultRowsAmount = apiConfig.defaultAmountOfRowsPerGetRquest;

  if (!page) page = 1;
  if (rowslimit > MaxRowsPerGetRequest) rowslimit = MaxRowsPerGetRequest;
  if (!rowslimit) rowslimit = defaultRowsAmount;
  req.query[`${consts.httpBodyAndQueries.page}`] = page;
  req.query[`${consts.httpBodyAndQueries.rowslimit}`] = rowslimit;
  next();
};

const changeDescriptionIfUndefined = (req, res, next) => {
  let shortDescription =
    req.body[`${consts.httpBodyAndQueries.shortDescription}`];
  let longDescription =
    req.body[`${consts.httpBodyAndQueries.longDescription}`];

  if (!shortDescription) shortDescription = "";
  if (!longDescription) longDescription = "";

  req.body[`${consts.httpBodyAndQueries.shortDescription}`] =
    shortDescription;
  req.body[`${consts.httpBodyAndQueries.longDescription}`] =
    longDescription;

  next();
};

export = {
  changePageIfUndefined,
  changeDescriptionIfUndefined,
};
