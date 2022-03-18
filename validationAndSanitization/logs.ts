import { body, oneOf, query, ValidationChain } from "express-validator";
import apiConfig from "../config/apiConfig";
import consts from "../config/consts";
import commonValidators from "../validationAndSanitization/common";
import AllowedResources from "../helpers/AllowedResources";
import databaseSchema from "../config/databaseSchema";

const structureSchemaForGetMethod = [
  consts.httpBodyAndQueries.rowslimit,
  consts.httpBodyAndQueries.page,
];

const structureSchemaForPostMethod = [
  consts.httpBodyAndQueries.logWasCreated,
  consts.httpBodyAndQueries.sendFromSource,
  consts.httpBodyAndQueries.sendFromSystem,
  consts.httpBodyAndQueries.sendFromCustomer,
  consts.httpBodyAndQueries.sendFromUser,
  consts.httpBodyAndQueries.longDescription,
  consts.httpBodyAndQueries.shortDescription,
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
  const userMaxLength =
    databaseSchema.systemlogsTablel.col_sendFromUser_max_length;
  const shortDescriptionMaxLength =
    databaseSchema.systemlogsTablel.col_shortDescription_max_length;
  const longDescriptionMaxLength =
    databaseSchema.systemlogsTablel.col_longDescription_max_length;
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
    body(consts.httpBodyAndQueries.sendFromUser)
      .isLength({
        max: userMaxLength,
      })
      .withMessage(
        `Enter value that with maximum of ${userMaxLength} characters`
      )
      .bail()
      .notEmpty()
      .withMessage("Value is required"),
    body(consts.httpBodyAndQueries.shortDescription)
      .isLength({
        max: shortDescriptionMaxLength,
      })
      .withMessage(
        `Enter value that with maximum of ${shortDescriptionMaxLength} characters`
      ),
    body(consts.httpBodyAndQueries.longDescription)
      .isLength({
        max: longDescriptionMaxLength,
      })
      .withMessage(
        `Enter value that with maximum of ${longDescriptionMaxLength} characters`
      ),
    oneOf([
      body(
        consts.httpBodyAndQueries.shortDescription,
        "Long or short description is required"
      )
        .notEmpty()
        .trim(),
      body(
        consts.httpBodyAndQueries.longDescription,
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
