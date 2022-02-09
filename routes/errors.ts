import {
  asyncErrorHandler,
  validationErrorsHandler,
} from "../helpers/errorsHandlers";
import {
  validationForLatestErrors,
  validationForAddingNewError,
} from "../validationAndSanitization/errors";
import { Router } from "express";
import { mutatePostQueryDescriptionsIfUndefined } from "../mutators/common";
import errorControler from "../controllers/errors";
import { maxRowsAndFirstPageSecure } from "../helpers/pageAndRowlimitSecure";
const router = Router();

router
  .route("/errors")
  .get(
    validationForLatestErrors(),
    validationErrorsHandler,
    maxRowsAndFirstPageSecure,
    asyncErrorHandler(errorControler.getLatestCreatedErrors)
  )
  .post((req, res) => {
    res.send("TBD");
  });

router
  .route("/error")
  .get((req, res) => {
    res.send("TBD");
  })
  .post(
    validationForAddingNewError(),
    validationErrorsHandler,
    mutatePostQueryDescriptionsIfUndefined,
    asyncErrorHandler(errorControler.addNewError)
  );

export default router;
