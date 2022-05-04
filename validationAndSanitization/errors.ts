import { body, query, ValidationChain } from "express-validator";
import config from "../config/apiConfig";
import consts from "../config/consts";
import commonValidators from "../validationAndSanitization/common";
import AllowedResources from "../helpers/AllowedResources";
import databaseSchema from "../database/databaseSchema";

const structureSchemaForGetMethod = [
  consts.httpBodyAndQueries.page,
  consts.httpBodyAndQueries.rowslimit,
  consts.httpBodyAndQueries.id,
  consts.httpBodyAndQueries.logWasCreatedFrom,
  consts.httpBodyAndQueries.logWasCreatedTo,
  consts.httpBodyAndQueries.sendFromCustomer,
  consts.httpBodyAndQueries.sendFromSystem,
  consts.httpBodyAndQueries.sendFromSource,
  consts.httpBodyAndQueries.sendFromUser,
  consts.httpBodyAndQueries.errorCode,
  consts.httpBodyAndQueries.errorDescription,
  consts.httpBodyAndQueries.comments,
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
  const customerMaxLength =
    databaseSchema.customersTable.col_systemName_max_length;
  const sourceMaxLength = databaseSchema.sourcesTable.col_systemName_max_length;
  const systemMaxLength =
    databaseSchema.systemsTable.col_systemName_max_lengths;
  const sendFromUserMaxLength =
    databaseSchema.systemlogsTablel.col_sendFromUser_max_length;
  const errorCodeMaxLength =
    databaseSchema.systemlogsTablel.col_errorCode_max_length;
  return [
    query(consts.httpBodyAndQueries.comments)
      .optional()
      .notEmpty()
      .trim()
      .withMessage("Value is required")
      .isLength({
        max: 100,
      })
      .withMessage(`Enter value that with maximum of 100 characters`)
      .toUpperCase(),
    query(consts.httpBodyAndQueries.errorDescription)
      .optional()
      .notEmpty()
      .trim()
      .withMessage("Value is required")
      .isLength({
        max: 100,
      })
      .withMessage(`Enter value that with maximum of 100 characters`)
      .toUpperCase(),
    query(consts.httpBodyAndQueries.errorCode)
      .optional()
      .notEmpty()
      .trim()
      .withMessage("Value is required")
      .isLength({
        max: errorCodeMaxLength,
      })
      .withMessage(
        `Enter value that with maximum of ${errorCodeMaxLength} characters`
      )
      .toUpperCase(),
    query(consts.httpBodyAndQueries.sendFromUser)
      .optional()
      .notEmpty()
      .trim()
      .withMessage("Value is required")
      .isLength({
        max: sendFromUserMaxLength,
      })
      .withMessage(
        `Enter value that with maximum of ${sendFromUserMaxLength} characters`
      )
      .toUpperCase(),
    query(consts.httpBodyAndQueries.sendFromSystem)
      .optional()
      .notEmpty()
      .trim()
      .withMessage("Value is required")
      .isLength({
        max: systemMaxLength,
      })
      .withMessage(
        `Enter value that with maximum of ${systemMaxLength} characters`
      )
      .toUpperCase(),
    query(consts.httpBodyAndQueries.sendFromSource)
      .optional()
      .notEmpty()
      .trim()
      .withMessage("Value is required")
      .isLength({
        max: sourceMaxLength,
      })
      .withMessage(
        `Enter value that with maximum of ${sourceMaxLength} characters`
      )
      .toUpperCase(),
    query(consts.httpBodyAndQueries.sendFromCustomer)
      .optional()
      .notEmpty()
      .trim()
      .withMessage("Value is required")
      .isLength({
        max: customerMaxLength,
      })
      .withMessage(
        `Enter value that with maximum of ${customerMaxLength} characters`
      )
      .toUpperCase(),
    query(consts.httpBodyAndQueries.page)
      .optional()
      .isInt({
        gt: 0,
      })
      .withMessage("Value should be a number that is greather than 0")
      .toInt(),
    query(consts.httpBodyAndQueries.rowslimit)
      .optional()
      .isInt({ min: 1, max: config.apiConfig.maximumRowsPerGetRequest })
      .withMessage(
        `Value should be greather than 0 and less than ${config.apiConfig.maximumRowsPerGetRequest}`
      )
      .toInt(),
    query(consts.httpBodyAndQueries.id)
      .optional()
      .notEmpty()
      .bail()
      .isInt({
        gt: 0,
      })
      .withMessage("Value should be a number that is greather than 0")
      .toInt(),
    query(consts.httpBodyAndQueries.logWasCreatedFrom)
      .optional()
      .notEmpty()
      .withMessage("Value is required")
      .isDate()
      .withMessage("Value should be correct Date in format (YYYY-MM-DD)"),
    query(consts.httpBodyAndQueries.logWasCreatedTo)
      .optional()
      .notEmpty()
      .withMessage("Value is required")
      .isDate()
      .withMessage("Value should be correct Date in format (YYYY-MM-DD)"),
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
