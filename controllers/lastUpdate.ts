import lastUpdateService from "../services/lastUpdate";
import consts from "../config/consts";
import apiResponseCreator from "../helpers/apiResponseGenerator";
import requestTime from "../middlewares/requestTime";
import databaseSchema from "../database/databaseSchema";

const getLastUpdateDate = async (req, res, next) => {
  const customer = req.query[consts.httpBodyAndQueries.customer];
  const source = req.query[consts.httpBodyAndQueries.source];
  const system = req.query[consts.httpBodyAndQueries.system];
  const fixedRowslimit = 1;
  const fixedPageNumber = 1;
  const logWasCreated = databaseSchema.systemlogsTablel.col_logWasCreated;
  const queryResults = await lastUpdateService
    .getLastUpdate(customer, source, system)
    .then((data: []) => {
      if (data.length) {
        const newArr = data.map((obj: any) => {
          if (obj[logWasCreated]) {
            const lastUpdateDate = new Date(obj[logWasCreated]);
            return {
              ...obj,
              logWasCreated:
                requestTime.convertTimeToLocalServerTimeZone(lastUpdateDate),
            };
          }
          return obj;
        });
        return newArr;
      } else {
        return data;
      }
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
