import { param, ValidationChain, query, body } from "express-validator";
import consts from "../config/consts";
import databaseSchema from "../config/databaseSchema";

const structureSchemaForPostMethod = [
  consts.httpBodyAndQueries.comments,
  consts.httpBodyAndQueries.allowedResourceName,
];

const structureSchemaForAllowedParamInRoute = [
  consts.httpParams.resourceValue_customers,
  consts.httpParams.resourceValue_sources,
  consts.httpParams.resourceValue_systems,
];

const contentValidationforGetMethod = (): ValidationChain[] => {
  const allowedValuesOfResourceParam = [
    consts.httpParams.resourceValue_customers,
    consts.httpParams.resourceValue_sources,
    consts.httpParams.resourceValue_systems,
  ];
  return [
    param(consts.httpParams.resourceName)
      .notEmpty()
      .toLowerCase()
      .isIn(allowedValuesOfResourceParam)
      .withMessage(
        "Must be one of the following values: " + allowedValuesOfResourceParam
      ),
    param(consts.httpParams.id)
      .optional()
      .isNumeric()
      .withMessage("Must be a number"),
  ];
};

const contentValidationforPostMethod = (): ValidationChain[] => {
  const commonMaxLengthForAllowedResource = Math.min(
    databaseSchema.customersTable.col_systemName_max_length,
    databaseSchema.sourcesTable.col_systemName_max_length,
    databaseSchema.systemsTable.col_systemName_max_lengths
  );
  const commonMaxLengthForAllowedResourcesComments = Math.min(
    databaseSchema.customersTable.col_comments_max_length,
    databaseSchema.sourcesTable.col_comments_max_length,
    databaseSchema.systemsTable.col_comments_max_length
  );
  return [
    body(consts.httpBodyAndQueries.allowedResourceName)
      .isLength({ max: commonMaxLengthForAllowedResource })
      .withMessage(
        `Enter value that with maximum of ${commonMaxLengthForAllowedResource} characters`
      )
      .bail()
      .notEmpty()
      .withMessage("Value is mandatory")
      .bail()
      .trim()
      .isAlphanumeric("pl-PL", { ignore: "." })
      .toUpperCase()
      .withMessage("Alphanumeric value is mandatory"),
    body(consts.httpBodyAndQueries.comments)
      .optional()
      .trim()
      .isLength({ max: commonMaxLengthForAllowedResourcesComments })
      .withMessage(
        `Enter value that with maximum of ${commonMaxLengthForAllowedResourcesComments} characters`
      )
      .bail(),
  ];
};

export = {
  structureSchemaForAllowedParamInRoute,
  contentValidationforPostMethod,
  structureSchemaForPostMethod,
  contentValidationforGetMethod,
};
