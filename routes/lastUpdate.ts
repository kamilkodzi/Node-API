import { Router } from "express";
import errorHandler from "../helpers/errorsHandlers";
import lastUpdateValidation from "../validationAndSanitization/lastUpdate";
import lastUpdateController from "../controllers/lastUpdate";
import commonValidation from "../validationAndSanitization/common"; //ok

const router = Router();

router.route("/lastupdate").get(
  commonValidation.structureValidation(
    lastUpdateValidation.structureSchemaForGetLastUpdate,
    { searchInQueryParams: true }
  ),
  lastUpdateValidation.contentValidationforGetMethod(),
  errorHandler.validationErrCatch,

  errorHandler.asyncErrCatch(lastUpdateController.getLastUpdateDate)
);

export default router;
