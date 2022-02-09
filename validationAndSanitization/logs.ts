import { body, oneOf, query, ValidationChain } from "express-validator";
import apiConfig from "../config/apiConfig";
import { httpBodyAndQueriesConsts as httpQry } from "../config/consts";
import {
  allowedCustomers,
  allowedSources,
  allowedSystems,
} from "../config/consts";

export const validationForLatestLogs = (): ValidationChain[] => {
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

export const validationForAddingNewLog = () => {
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
      .toUpperCase()
      .trim()
      .withMessage("Value is required")
      .isIn(allowedSources)
      .withMessage(
        "Be sure that value is one of the following: " + allowedSources
      ),
    body(httpQry.body_sendFromSystem)
      .notEmpty()
      .toUpperCase()
      .trim()
      .withMessage("Value is required")
      .isIn(allowedSystems)
      .withMessage(
        "Be sure that value is one of the following: " + allowedSystems
      ),
    body(httpQry.body_sendFromCustomer)
      .notEmpty()
      .toUpperCase()
      .trim()
      .withMessage("Value is required")
      .isIn(allowedCustomers)
      .withMessage(
        "Be sure that value is one of the following: " + allowedCustomers
      ),
    body(httpQry.body_sendFromUser).notEmpty().withMessage("Value is required"),
    oneOf([
      body(
        httpQry.body_shortDescription,
        "Long or short description is required"
      )
        .notEmpty()
        .trim(),
      body(
        httpQry.body_longDescription,
        "Long or short description is required"
      )
        .notEmpty()
        .trim(),
    ]),
  ];
};
