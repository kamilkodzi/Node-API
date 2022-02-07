import {
  asyncErrorHandler,
  validationErrorsHandler,
} from "../helpers/errorsHandlers";
import { Router } from "express";
import validation from "../validationAndSanitization/logs";
import mutate from "../mutators/logs";
import logsControler from "../controllers/logs";
const router = Router();

router
  .route("/")
  .get(
    validation.validationForLatestLogs(),
    validationErrorsHandler,
    mutate.mutateGetQueryForLatestLogs,
    asyncErrorHandler(logsControler.getLatestCreatedLogs)
  )
  .post(
    validation.validationForAddingNewLog(),
    validationErrorsHandler,
    asyncErrorHandler(logsControler.addNewLog)
  );

export default router;
