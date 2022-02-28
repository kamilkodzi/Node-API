import lastUpdateService from "../services/lastUpdate";
import { httpBodyAndQueriesConsts as httpQry } from "../config/consts";
import apiResponseCreator from "../helpers/apiResponseGenerator";

const getLastUpdateDate = async (req, res, next) => {
  const customer = req.query[httpQry.query_customer];
  const source = req.query[httpQry.query_source];
  const system = req.query[httpQry.query_system];
  const fixedRowslimit = 1;
  const fixedPageNumber = 1;
  const queryResults: [] = await lastUpdateService
    .getLastUpdate(customer, source, system)
    .then((data: []) => {
      return data;
    });
  const queryResultsLenght = queryResults.length;
  const apiAnswer = apiResponseCreator.createGetResponse(
    queryResults,
    fixedRowslimit,
    fixedPageNumber,
    queryResultsLenght
  );
  res.status(200).send(apiAnswer);
};

export = {
  getLastUpdateDate,
};
