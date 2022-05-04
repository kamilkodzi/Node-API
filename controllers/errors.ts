import getOffset from "../helpers/offsetQueries";
import errorsService from "../services/errors";
import apiResponseCreator from "../helpers/apiResponseGenerator";
import consts from "../config/consts";

const getLatestCreatedErrors = async (req, res, next) => {
  const page = req.query[consts.httpBodyAndQueries.page];
  const rowslimit = req.query[consts.httpBodyAndQueries.rowslimit];
  const offset = getOffset(page, rowslimit);
  const queryParams = req.query;
  const queryResults = await errorsService
    .getErrors({
      offset,
      rowslimit,
      queryParams,
    })
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

export default {
  getLatestCreatedErrors,
  addNewError,
};
