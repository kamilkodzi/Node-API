import { query, ValidationChain } from "express-validator";
import apiConfig from "../config/apiConfig";
import { httpBodyAndQueriesConsts as httpQry } from "../config/consts";

const validationForLatestLogs = (): ValidationChain[] => {
  return [
    query(
      httpQry.query_page,
      "Value should be a number that is greather than 0"
    )
      .optional()
      .isInt({
        gt: 0,
      }),
    query(httpQry.query_page).toInt(),

    query(
      httpQry.query_rowslimit,
      `Value should be greather than 0 and less than ${apiConfig.maximumRowsPerGetRequest}`
    )
      .isInt({ gt: 0 })
      .optional(),
    query(httpQry.query_rowslimit).toInt(),
  ];
};

const logsValidation = {
  validationForLatestLogs,
};
export default logsValidation;
