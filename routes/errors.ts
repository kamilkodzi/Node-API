import { Router } from "express";
import errorHandler from "../helpers/errorsHandlers";
import errorsValidation from "../validationAndSanitization/errors";
import errorControler from "../controllers/errors";
import mutation from "../mutators/common";
import commonValidation from "../validationAndSanitization/common";

const router = Router();

router
  .route("/error")
  .post(
    commonValidation.structureValidation(
      errorsValidation.structureSchemaForPostMethod,
      { searchInBody: true }
    ),
    errorsValidation.contentValidationforPostMethod(),
    errorHandler.validationErrCatch,
    mutation.changeDescriptionIfUndefined,
    errorHandler.asyncErrCatch(errorControler.addNewError)
  );

router
  .route("/errors")
  .get(
    commonValidation.structureValidation(
      errorsValidation.structureSchemaForGetMethod,
      { searchInQueryParams: true }
    ),
    errorsValidation.contentValidationforGetMethod(),
    errorHandler.validationErrCatch,
    mutation.changePageIfUndefined,
    errorHandler.asyncErrCatch(errorControler.getLatestCreatedErrors)
  );

export default router;
