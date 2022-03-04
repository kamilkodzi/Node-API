import { query } from "express-validator";
import { httpBodyAndQueriesConsts as httpQry } from "../config/consts";
import allowedResourcesController from "../controllers/allowedResources";
import commonValidators from "../validationAndSanitization/common";

const structureSchemaForGetLastUpdate = [
  httpQry.query_source,
  httpQry.query_customer,
  httpQry.query_system,
];

const contentValidationforGetMethod = () => {
  return [
    query(httpQry.query_source)
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
    query(httpQry.query_customer)
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
    query(httpQry.query_system)
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
  ];
};

export = {
  structureSchemaForGetLastUpdate,
  contentValidationforGetMethod,
};
