import { query, ValidationChain } from "express-validator";
import apiConfig from "../config/apiConfig";

const forLatestLogs = (): ValidationChain[] => {
  return [
    query("page", "Value should be a number that is greather than 0")
      .optional()
      .isInt({
        gt: 0,
      }),
    query("page").toInt(),

    query(
      "rowslimit",
      `Value should be greather than 0 and less than ${apiConfig.maximumRowsPerGetRequest}`
    )
      .isInt({ gt: 0 })
      .optional(),
    query("rowslimit").toInt(),
  ];
};

const logsValidation = {
  forLatestLogs,
};
export default logsValidation;
