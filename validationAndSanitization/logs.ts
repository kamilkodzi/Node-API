import { body, oneOf, query, ValidationChain } from "express-validator";
import apiConfig from "../config/apiConfig";
import { httpBodyAndQueriesConsts as httpQry } from "../config/consts";
import allowedResourcesController from "../controllers/allowedResources";
import commonValidators from "../validationAndSanitization/common";

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
  httpQry.body_longDescription,
  httpQry.body_shortDescription,
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
      .custom((value) =>
        commonValidators.chceckThatValueIsAllowedRosource(
          value,
          allowedResourcesController.getAllowedSources
        )
      ),
    body(httpQry.body_sendFromSystem)
      .notEmpty()
      .toUpperCase()
      .trim()
      .withMessage("Value is required")
      .bail()
      .custom((value) =>
        commonValidators.chceckThatValueIsAllowedRosource(
          value,
          allowedResourcesController.getAllowedSystems
        )
      ),
    body(httpQry.body_sendFromCustomer)
      .notEmpty()
      .toUpperCase()
      .trim()
      .withMessage("Value is required")
      .bail()
      .custom((value) =>
        commonValidators.chceckThatValueIsAllowedRosource(
          value,
          allowedResourcesController.getAllowedCustomers
        )
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
export = {
  structureSchemaForGetMethod,
  structureSchemaForPostMethod,
  contentValidationforGetMethod,
  contentValidationforPostMethod,
};
