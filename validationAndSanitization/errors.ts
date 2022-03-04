import { body, query, ValidationChain } from "express-validator";
import apiConfig from "../config/apiConfig";
import consts from "../config/consts";
import commonValidators from "../validationAndSanitization/common";
import AllowedResources from "../helpers/AllowedResources";

const structureSchemaForGetMethod = [
  consts.httpBodyAndQueries.query_page,
  consts.httpBodyAndQueries.query_rowslimit,
];

const structureSchemaForPostMethod = [
  consts.httpBodyAndQueries.body_logWasCreated,
  consts.httpBodyAndQueries.body_sendFromSource,
  consts.httpBodyAndQueries.body_sendFromSystem,
  consts.httpBodyAndQueries.body_sendFromCustomer,
  consts.httpBodyAndQueries.body_sendFromUser,
  consts.httpBodyAndQueries.body_errorCode,
  consts.httpBodyAndQueries.body_errorDescription,
];

const contentValidationforGetMethod = (): ValidationChain[] => {
  return [
    query(consts.httpBodyAndQueries.query_page)
      .optional()
      .isInt({
        gt: 0,
      })
      .withMessage("Value should be a number that is greather than 0")
      .toInt(),
    query(consts.httpBodyAndQueries.query_rowslimit)
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
    body(consts.httpBodyAndQueries.body_logWasCreated)
      .notEmpty()
      .withMessage("Value is required")
      .isISO8601()
      .withMessage(
        "Value should be in Date in ISO8601 format (YYYY-MM-DD hh:mm:ss)"
      ),
    body(consts.httpBodyAndQueries.body_sendFromSource)
      .notEmpty()
      .toUpperCase()
      .trim()
      .withMessage("Value is required")
      .bail()
      .custom((value) =>
        commonValidators.chceckThatValueIsAllowedRosource(
          value,
          AllowedResources.allowedSources
        )
      ),
    body(consts.httpBodyAndQueries.body_sendFromSystem)
      .notEmpty()
      .toUpperCase()
      .trim()
      .withMessage("Value is required")
      .bail()
      .custom((value) =>
        commonValidators.chceckThatValueIsAllowedRosource(
          value,
          AllowedResources.allowedSystems
        )
      ),
    body(consts.httpBodyAndQueries.body_sendFromCustomer)
      .notEmpty()
      .toUpperCase()
      .trim()
      .withMessage("Value is required")
      .bail()
      .custom((value) =>
        commonValidators.chceckThatValueIsAllowedRosource(
          value,
          AllowedResources.allowedCustomers
        )
      ),
    body(consts.httpBodyAndQueries.body_errorCode)
      .notEmpty()
      .toUpperCase()
      .trim()
      .withMessage("Value is required"),
    body(consts.httpBodyAndQueries.body_errorDescription)
      .notEmpty()
      .trim()
      .withMessage("Value is required")
      .trim(),
    body(consts.httpBodyAndQueries.body_sendFromUser)
      .notEmpty()
      .trim()
      .withMessage("Value is required"),
    body(
      consts.httpBodyAndQueries.body_shortDescription,
      "Long or short description is required"
    ).trim(),
    body(
      consts.httpBodyAndQueries.body_longDescription,
      "Long or short description is required"
    ).trim(),
  ];
};

export = {
  structureSchemaForGetMethod,
  structureSchemaForPostMethod,
  contentValidationforGetMethod,
  contentValidationforPostMethod,
};
