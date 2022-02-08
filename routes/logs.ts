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
  .route("/logs")
  .get(
    validation.validationForLatestLogs(),
    validationErrorsHandler,
    mutate.mutateGetQueryForLatestLogs,
    asyncErrorHandler(logsControler.getLatestCreatedLogs)
  )
  .post((req, res) => {
    res.send("TBD");
  });

router
  .route("/log")
  .get((req, res) => {
    res.send("TBD");
  })
  .post(
    validation.validationForAddingNewLog(),
    validationErrorsHandler,
    mutate.mutatePostQueryAddNewLog,
    asyncErrorHandler(logsControler.addNewLog)
  );

export default router;
