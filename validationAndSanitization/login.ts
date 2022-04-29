import { body, ValidationChain } from "express-validator";
import consts from "../config/consts";
import databaseSchema from "../database/databaseSchema";

const structureSchemaForGetMethod = [];

const structureSchemaForPostMethod = [
  consts.httpBodyAndQueries.username,
  consts.httpBodyAndQueries.password,
];

const contentValidationforPostMethod = (): ValidationChain[] => {
  const userMaxLength = databaseSchema.loggerusersTable.col_username_max_length;
  const passwordMaxLength =
    databaseSchema.loggerusersTable.col_password_max_length;
  return [
    body(consts.httpBodyAndQueries.username)
      .notEmpty()
      .withMessage("Value is required")
      .isLength({
        max: userMaxLength,
      })
      .withMessage(
        `Enter value that with maximum of ${userMaxLength} characters`
      ),
    body(consts.httpBodyAndQueries.password)
      .notEmpty()
      .withMessage("Value is required")
      .isLength({
        max: passwordMaxLength,
      })
      .withMessage(
        `Enter value that with maximum of ${passwordMaxLength} characters`
      ),
  ];
};

export default {
  contentValidationforPostMethod,
  structureSchemaForGetMethod,
  structureSchemaForPostMethod,
};
