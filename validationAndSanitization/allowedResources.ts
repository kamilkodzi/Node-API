import { param, ValidationChain } from "express-validator";
import consts from "../config/consts";

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

export = {
  contentValidationforGetMethod,
};
