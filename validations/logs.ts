import { query, ValidationChain } from "express-validator";
import apiConfig from "../config/apiConfig";

const schemaForLatestLogs = (): ValidationChain[] => {
  return [
    query("page").optional(),
    query("page", "Value should be greather than 0").isInt({
      gt: 0,
    }),
    query("page").toInt(),
    query("rowsPerPage").optional(),
    query(
      "rowsPerPage",
      `Value should be greather than 0 and less than ${apiConfig.maximumRowsPerGetRequest}`
    ).isInt({ gt: 0 }),
    query("rowsPerPage").toInt(),
  ];
};


const logsValidation = {
  schemaForLatestLogs,
};
export default logsValidation;
