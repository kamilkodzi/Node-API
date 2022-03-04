import getOffset from "../helpers/offsetQueries";
import errorsService from "../services/errors";
import apiResponseCreator from "../helpers/apiResponseGenerator";
import { httpBodyAndQueriesConsts as httpQry } from "../config/consts";
// import allowedResources from "../validationAndSanitization/allowedResources";

const getLatestCreatedErrors = async (req, res, next) => {
  // console.log(allowedResources.getAllowedSystems());
  const page = req.query[httpQry.query_page];
  const rowslimit = req.query[httpQry.query_rowslimit];
  const pageTurnedInToOffset = getOffset(page, rowslimit);
  const queryResults = await errorsService
    .getErrors(pageTurnedInToOffset, rowslimit)
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

const addNewError = async (req, res, next) => {
  const queryResults = await errorsService.addNewError(req);
  const apiAnswer = apiResponseCreator.createPostResponse(queryResults);
  res.status(201).send(apiAnswer);
};

export = {
  getLatestCreatedErrors,
  addNewError,
};
