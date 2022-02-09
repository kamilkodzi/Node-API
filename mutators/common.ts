import { httpBodyAndQueriesConsts as httpQry } from "../config/consts";

export const mutatePostQueryDescriptionsIfUndefined = (req, res, next) => {
  let shortDescription = req.body[`${httpQry.body_shortDescription}`];
  let longDescription = req.body[`${httpQry.body_longDescription}`];

  if (!shortDescription) shortDescription = "";
  if (!longDescription) longDescription = "";

  req.body[`${httpQry.body_shortDescription}`] = shortDescription;
  req.body[`${httpQry.body_longDescription}`] = longDescription;

  next();
};