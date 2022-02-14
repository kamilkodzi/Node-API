import getOffset from "../helpers/offsetQueries";
import {
  getLatestErrorsQuery,
  addNewErrorToDatabase,
} from "../services/errors";
import { httpBodyAndQueriesConsts as httpQry } from "../config/consts";
import {
  generateGetResponse,
  generatePostResponse,
} from "../helpers/apiAnswerGenerator";

const getLatestCreatedErrors = async (req, res, next) => {
  const page = req.query[httpQry.query_page];
  const rowslimit = req.query[httpQry.query_rowslimit];
  const pageTurnedInToOffset = getOffset(page, rowslimit);
  const queryResults = await getLatestErrorsQuery(
    pageTurnedInToOffset,
    rowslimit
  ).then((data: []) => {
    return data;
  });
  const queryResultsLenght = queryResults.length;
  
  const apiAnswer = generateGetResponse(
    queryResults,
    rowslimit,
    page,
    queryResultsLenght
  );
  res.status(200).send(apiAnswer);
};

const addNewError = async (req, res, next) => {
  const queryResults = await addNewErrorToDatabase(req);
  const apiAnswer = generatePostResponse(queryResults);
  res.status(201).send(apiAnswer);
};

export = {
  getLatestCreatedErrors,
  addNewError,
};
