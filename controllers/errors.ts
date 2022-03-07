import getOffset from "../helpers/offsetQueries";
import errorsService from "../services/errors";
import apiResponseCreator from "../helpers/apiResponseGenerator";
import consts from "../config/consts";

const getLatestCreatedErrors = async (req, res, next) => {
  const page = req.query[consts.httpBodyAndQueries.query_page];
  const rowslimit = req.query[consts.httpBodyAndQueries.query_rowslimit];
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
