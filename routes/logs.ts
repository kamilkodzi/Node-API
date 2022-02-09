import {
  asyncErrorHandler,
  validationErrorsHandler,
} from "../helpers/errorsHandlers";

import {
  validationForLatestLogs,
  validationForAddingNewLog,
} from "../validationAndSanitization/logs";
import { Router } from "express";
import { mutatePostQueryDescriptionsIfUndefined } from "../mutators/common";
import logsControler from "../controllers/logs";
import { maxRowsAndFirstPageSecure } from "../helpers/pageAndRowlimitSecure";
const router = Router();

router
  .route("/logs")
  .get(
    validationForLatestLogs(),
    validationErrorsHandler,
    maxRowsAndFirstPageSecure,
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
    validationForAddingNewLog(),
    validationErrorsHandler,
    mutatePostQueryDescriptionsIfUndefined,
    asyncErrorHandler(logsControler.addNewLog)
  );

export default router;
