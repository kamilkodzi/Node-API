import { query } from "express-validator";
import consts from "../config/consts";
import commonValidators from "../validationAndSanitization/common";
import AllowedResources from "../helpers/AllowedResources";

const structureSchemaForGetLastUpdate = [
  consts.httpBodyAndQueries.source,
  consts.httpBodyAndQueries.customer,
  consts.httpBodyAndQueries.system,
];

const contentValidationforGetMethod = () => {
  return [
    query(consts.httpBodyAndQueries.source)
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
    query(consts.httpBodyAndQueries.customer)
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
    query(consts.httpBodyAndQueries.system)
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
