import { body, query, ValidationChain } from "express-validator";
import apiConfig from "../config/apiConfig";
import { httpBodyAndQueriesConsts as httpQry } from "../config/consts";
import {
  allowedCustomers,
  allowedSources,
  allowedSystems,
} from "../config/consts";

const structureSchemaForGetMethod = [
  httpQry.query_page,
  httpQry.query_rowslimit,
];

const structureSchemaForPostMethod = [
  httpQry.body_logWasCreated,
  httpQry.body_sendFromSource,
  httpQry.body_sendFromSystem,
  httpQry.body_sendFromCustomer,
  httpQry.body_sendFromUser,
  httpQry.body_errorCode,
  httpQry.body_errorDescription,
];

const contentValidationforGetMethod = (): ValidationChain[] => {
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
      .isInt({ min: 1, max: apiConfig.maximumRowsPerGetRequest })
      .withMessage(
        `Value should be greather than 0 and less than ${apiConfig.maximumRowsPerGetRequest}`
      )
      .toInt(),
  ];
};

const contentValidationforPostMethod = () => {
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
      .bail()
      .isIn(allowedSources)
      .withMessage(
        "Be sure that value is one of the following: " + allowedSources
      ),
    body(httpQry.body_sendFromSystem)
      .notEmpty()
      .toUpperCase()
      .trim()
      .withMessage("Value is required")
      .bail()
      .isIn(allowedSystems)
      .withMessage(
        "Be sure that value is one of the following: " + allowedSystems
      ),
    body(httpQry.body_sendFromCustomer)
      .notEmpty()
      .toUpperCase()
      .trim()
      .withMessage("Value is required")
      .bail()
      .isIn(allowedCustomers)
      .withMessage(
        "Be sure that value is one of the following: " + allowedCustomers
      ),
    body(httpQry.body_errorCode)
      .notEmpty()
      .toUpperCase()
      .trim()
      .withMessage("Value is required"),
    body(httpQry.body_errorDescription)
      .notEmpty()
      .trim()
      .withMessage("Value is required")
      .trim(),
    body(httpQry.body_sendFromUser)
      .notEmpty()
      .trim()
      .withMessage("Value is required"),
    body(
      httpQry.body_shortDescription,
      "Long or short description is required"
    ).trim(),
    body(
      httpQry.body_longDescription,
      "Long or short description is required"
    ).trim(),
  ];
};

const errorsValidation = {
  structureSchemaForGetMethod,
  structureSchemaForPostMethod,
  contentValidationforGetMethod,
  contentValidationforPostMethod,
};
export default errorsValidation;
