import {
  asyncErrorHandler,
  validationErrorsHandler,
} from "../helpers/errorsHandlers";
import {
  validationForPostingNewLog,
  validationForGettingLatestLogs,
  getLogsParamMatchSchema,
  postLogParamMatchSchema,
} from "../validationAndSanitization/logs";
import { Router } from "express";
import { mutatePostQueryDescriptionsIfUndefined } from "../mutators/common";
import logsControler from "../controllers/logs";
import { mutateFirstPageAndPageIfUndefined } from "../mutators/common";
import { checkThatSendParamsMatchSchema } from "../validationAndSanitization/common";

const router = Router();

router
  .route("/log")
  .get(logsControler.redirectToLogsRoute)
  .post(
    checkThatSendParamsMatchSchema(postLogParamMatchSchema),
    validationForPostingNewLog(),
    validationErrorsHandler,
    mutatePostQueryDescriptionsIfUndefined,
    asyncErrorHandler(logsControler.addNewLog)
  );

router
  .route("/logs")
  .get(
    checkThatSendParamsMatchSchema(getLogsParamMatchSchema),
    validationForGettingLatestLogs(),
    validationErrorsHandler,
    mutateFirstPageAndPageIfUndefined,
    asyncErrorHandler(logsControler.getLatestCreatedLogs)
  )
  .post((req, res) => {
    res.send("TBD");
  });

export default router;
