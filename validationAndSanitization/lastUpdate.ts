import { query } from "express-validator";
import consts from "../config/consts";
import commonValidators from "../validationAndSanitization/common";
import AllowedResources from "../helpers/AllowedResources";

const structureSchemaForGetLastUpdate = [
  consts.httpBodyAndQueries.query_source,
  consts.httpBodyAndQueries.query_customer,
  consts.httpBodyAndQueries.query_system,
];

const contentValidationforGetMethod = () => {
  return [
    query(consts.httpBodyAndQueries.query_source)
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
    query(consts.httpBodyAndQueries.query_customer)
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
    query(consts.httpBodyAndQueries.query_system)
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
  ];
};

export = {
  structureSchemaForGetLastUpdate,
  contentValidationforGetMethod,
};
