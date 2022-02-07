import { body, oneOf, query, ValidationChain } from "express-validator";
import apiConfig from "../config/apiConfig";
import { httpBodyAndQueriesConsts as httpQry } from "../config/consts";

const validationForLatestLogs = (): ValidationChain[] => {
  return [
    query(httpQry.query_page)
      .optional()
      .isInt({
        gt: 0,
      })
      .withMessage("Value should be a number that is greather than 0")
      .toInt(),
    query(httpQry.query_rowslimit)
      .optional()
      .isInt({ gt: 0 })
      .withMessage(
        `Value should be greather than 0 and less than ${apiConfig.maximumRowsPerGetRequest}`
      )
      .toInt(),
  ];
};

const validationForAddingNewLog = () => {
  console.log("validated");
  return [
    body(httpQry.body_logWasCreated)
      .notEmpty()
      .withMessage("Value is required")
      .isISO8601()
      .withMessage(
        "Value should be in Date in ISO8601 format (YYYY-MM-DD hh:mm:ss)"
      ),
    body(httpQry.body_sendFromSource)
      .notEmpty()
      .withMessage("Value is required"),
    body(httpQry.body_sendFromSystem)
      .notEmpty()
      .withMessage("Value is required"),
    body(httpQry.body_sendFromCustomer)
      .notEmpty()
      .withMessage("Value is required"),
    body(httpQry.body_sendFromUser).notEmpty().withMessage("Value is required"),
    oneOf([
      //Napisać nested reeor - w error handlerze (pojawiły się nestedy/ trzeba to ogarnac - meh!!)
      body(
        httpQry.body_shortDescription,
        "Long or short description is required"
      ).notEmpty(),
      body(
        httpQry.body_longDescription,
        "Long or short description is required"
      ).notEmpty(),
    ]),
    // body(httpQry.body_shortDescription)
    //   .notEmpty()
    //   .withMessage("Value is required"),
    // body(httpQry.body_longDescription)
    //   .notEmpty()
    //   .withMessage("Value is required"),
    body(httpQry.body_isShowingAnError)
      .notEmpty()
      .withMessage("Value is required")
      .isBoolean()
      .withMessage("Value must be true or false or 0 or 1"),
    // body(httpQry.body_errorCode).notEmpty().withMessage("Value is required"),
    // body(httpQry.body_errorDescription)
    //   .notEmpty()
    //   .withMessage("Value is required"),
  ];
};

const logsValidation = {
  validationForLatestLogs,
  validationForAddingNewLog,
};
export default logsValidation;
