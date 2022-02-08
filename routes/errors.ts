import {
  asyncErrorHandler,
  validationErrorsHandler,
} from "../helpers/errorsHandlers";
import { Router } from "express";
import validation from "../validationAndSanitization/errors";
import mutate from "../mutators/errors";
import errorControler from "../controllers/errors";
const router = Router();

router
  .route("/errors")
  .get(
    validation.validationForLatestErrors(),
    validationErrorsHandler,
    mutate.mutateGetQueryForLatestErrors,
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
    validation.validationForAddingNewError(),
    validationErrorsHandler,
    mutate.mutatePostQueryAddNewError,
    asyncErrorHandler(errorControler.addNewError)
  );

export default router;
