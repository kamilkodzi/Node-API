import { Router } from "express";
import errorHandler from "../helpers/errorsHandlers";
import logsValidation from "../validationAndSanitization/logs";
import logsControler from "../controllers/logs";
import mutation from "../mutators/common";
import commonValidation from "../validationAndSanitization/common";

const router = Router();

router
  .route("/log")
  .get(logsControler.redirectToLogsRoute)
  .post(
    (req, res, next) => {
      next();
    },
    commonValidation.structureValidation(
      logsValidation.structureSchemaForPostMethod
    ),
    logsValidation.contentValidationforPostMethod(),
    errorHandler.validationErrCatch,
    mutation.changeDescriptionIfUndefined,
    errorHandler.asyncErrCatch(logsControler.addNewLog)
  );

router
  .route("/logs")
  .get(
    commonValidation.structureValidation(
      logsValidation.structureSchemaForGetMethod
    ),
    logsValidation.contentValidationforGetMethod(),
    errorHandler.validationErrCatch,
    mutation.changePageIfUndefined,
    errorHandler.asyncErrCatch(logsControler.getLatestCreatedLogs)
  );

export default router;
