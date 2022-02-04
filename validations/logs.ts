import { query } from "express-validator";
import validationTypes from "../config/validationTypesList";
import apiConfig from "../config/apiConfig";

const validateIncommingClientData = (typeOfValidation: string) => {
  switch (typeOfValidation) {
    case validationTypes.GET_LATEST_LOGS: {
      return [
        query("page").optional(),
        query("page", "Value should be greather than 0").isInt({
          gt: 0,
        }),
        query("page").toInt(),
        query("rowsPerPage").optional(),
        query(
          "rowsPerPage",
          "Value should be greather than 0 and less than " +
            apiConfig.maximumRowsPerGetRequest
        ).isInt({ gt: 0 }),
        query("rowsPerPage").toInt(),
      ];
    }

    default:
      throw new Error(
        "You did not define such Validation types, each request send via client side must be validated"
      );
  }
};

export default validateIncommingClientData;
