import { query } from "express-validator";
import { httpBodyAndQueriesConsts as httpQry } from "../config/consts";
import {
  allowedCustomers,
  allowedSources,
  allowedSystems,
} from "../config/consts";

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
      .isIn(allowedSources)
      .withMessage(
        "Be sure that value is one of the following: " + allowedSources
      ),
    query(httpQry.query_customer)
      .notEmpty()
      .toUpperCase()
      .trim()
      .withMessage("Value is required")
      .bail()
      .isIn(allowedCustomers)
      .withMessage(
        "Be sure that value is one of the following: " + allowedCustomers
      ),
    query(httpQry.query_system)
      .notEmpty()
      .toUpperCase()
      .trim()
      .withMessage("Value is required")
      .bail()
      .isIn(allowedSystems)
      .withMessage(
        "Be sure that value is one of the following: " + allowedSystems
      ),
  ];
};

const lastUpdateValidation = {
  structureSchemaForGetLastUpdate,
  contentValidationforGetMethod,
};
export default lastUpdateValidation;
