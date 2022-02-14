import {
  asyncErrorHandler,
  validationErrorsHandler,
} from "../helpers/errorsHandlers";
import {
  validationForLatestErrors,
  validationForAddingNewError,
  getErrorsParamMatchSchema,
  postErrorParamMatchSchema,
} from "../validationAndSanitization/errors";
import { Router } from "express";
import { mutatePostQueryDescriptionsIfUndefined } from "../mutators/common";
import errorControler from "../controllers/errors";
import { mutateFirstPageAndPageIfUndefined } from "../mutators/common";
import { checkThatSendParamsMatchSchema } from "../validationAndSanitization/common";
const router = Router();

router
  .route("/error")
  .get((req, res) => {
    res.send("TBD");
  })
  .post(
    checkThatSendParamsMatchSchema(postErrorParamMatchSchema),
    validationForAddingNewError(),
    validationErrorsHandler,
    mutatePostQueryDescriptionsIfUndefined,
    asyncErrorHandler(errorControler.addNewError)
  );
router
  .route("/errors")
  .get(
    checkThatSendParamsMatchSchema(getErrorsParamMatchSchema),
    validationForLatestErrors(),
    validationErrorsHandler,
    mutateFirstPageAndPageIfUndefined,
    asyncErrorHandler(errorControler.getLatestCreatedErrors)
  )
  .post((req, res) => {
    res.send("TBD");
  });

export default router;
