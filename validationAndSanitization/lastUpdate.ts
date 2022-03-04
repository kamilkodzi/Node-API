import { query } from "express-validator";
import consts from "../config/consts";
import allowedResourcesController from "../controllers/allowedResources";
import commonValidators from "../validationAndSanitization/common";

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
          allowedResourcesController.allowedSources
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
          allowedResourcesController.allowedCustomers
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
          allowedResourcesController.allowedSystems
        )
      ),
  ];
};

export = {
  structureSchemaForGetLastUpdate,
  contentValidationforGetMethod,
};
