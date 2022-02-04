import { query, ValidationChain } from "express-validator";
import apiConfig from "../config/apiConfig";

const forLatestLogs = (): ValidationChain[] => {
  return [
    //nie działa - jak ni eprzesyłamy parametrów to wywala niepotrzebny błąd
    // query("page").optional(),
    // query("page", "Value should be greather than 0").optional().isInt({
    //   gt: 0,
    // }),
    // query("page").toInt().optional(),
    // query("rowslimit").optional(),
    // query(
    //   "rowslimit",
    //   `Value should be greather than 0 and less than ${apiConfig.maximumRowsPerGetRequest}`
    // ).isInt({ gt: 0 }),
    // query("rowslimit").toInt(),
  ];
};

const logsValidation = {
  forLatestLogs,
};
export default logsValidation;
