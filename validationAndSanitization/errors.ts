import { body, query, ValidationChain } from "express-validator";
import apiConfig from "../config/apiConfig";
import consts from "../config/consts";
import commonValidators from "../validationAndSanitization/common";
import AllowedResources from "../helpers/AllowedResources";
import databaseSchema from "../config/databaseSchema";

const structureSchemaForGetMethod = [
  consts.httpBodyAndQueries.page,
  consts.httpBodyAndQueries.rowslimit,
];

const structureSchemaForPostMethod = [
  consts.httpBodyAndQueries.logWasCreated,
  consts.httpBodyAndQueries.sendFromSource,
  consts.httpBodyAndQueries.sendFromSystem,
  consts.httpBodyAndQueries.sendFromCustomer,
  consts.httpBodyAndQueries.sendFromUser,
  consts.httpBodyAndQueries.errorCode,
  consts.httpBodyAndQueries.errorDescription,
];

const contentValidationforGetMethod = (): ValidationChain[] => {
  return [
    query(consts.httpBodyAndQueries.page)
      .optional()
      .isInt({
        gt: 0,
      })
      .withMessage("Value should be a number that is greather than 0")
      .toInt(),
    query(consts.httpBodyAndQueries.rowslimit)
      .optional()
      .isInt({ min: 1, max: apiConfig.maximumRowsPerGetRequest })
      .withMessage(
        `Value should be greather than 0 and less than ${apiConfig.maximumRowsPerGetRequest}`
      )
      .toInt(),
  ];
};

const contentValidationforPostMethod = () => {
  const errorCodeMaxLength =
    databaseSchema.systemlogsTablel.col_errorCode_max_length;
  const userMaxLength =
    databaseSchema.systemlogsTablel.col_sendFromUser_max_length;
  const errorDescriptionMaxLength =
    databaseSchema.systemlogsTablel.col_errorDescription_max_length;

  return [
    body(consts.httpBodyAndQueries.logWasCreated)
      .notEmpty()
      .withMessage("Value is required")
      .isISO8601()
      .withMessage(
        "Value should be correct Date in ISO8601 format (YYYY-MM-DD hh:mm:ss)"
      )
      .bail()
      .custom((value) => commonValidators.dateFormatCheckWithRegExp(value)),
    body(consts.httpBodyAndQueries.sendFromSource)
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
    body(consts.httpBodyAndQueries.sendFromSystem)
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
    body(consts.httpBodyAndQueries.sendFromCustomer)
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
    body(consts.httpBodyAndQueries.errorCode)
      .isLength({
        max: errorCodeMaxLength,
      })
      .withMessage(
        `Enter value that with maximum of ${errorCodeMaxLength} characters`
      )
      .bail()
      .notEmpty()
      .toUpperCase()
      .trim()
      .withMessage("Value is required"),
    body(consts.httpBodyAndQueries.errorDescription)
      .isLength({
        max: errorDescriptionMaxLength,
      })
      .withMessage(
        `Enter value that with maximum of ${errorDescriptionMaxLength} characters`
      )
      .notEmpty()
      .trim()
      .withMessage("Value is required")
      .trim(),
    body(consts.httpBodyAndQueries.sendFromUser)
      .isLength({
        max: userMaxLength,
      })
      .withMessage(
        `Enter value that with maximum of ${userMaxLength} characters`
      )
      .bail()
      .notEmpty()
      .trim()
      .withMessage("Value is required"),
  ];
};

export = {
  structureSchemaForGetMethod,
  structureSchemaForPostMethod,
  contentValidationforGetMethod,
  contentValidationforPostMethod,
};
