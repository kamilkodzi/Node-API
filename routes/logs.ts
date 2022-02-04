import { Router } from "express";
import db from "../config/databaseConfiguration";
import { getLatestCreatedLogs } from "../controllers/logs";
import {
  asyncErrorHandler,
  validationErrorsHandler,
} from "../helpers/errorsHandlers";
import ExpressError from "../helpers/ExpressError";
const router = Router();
import validateSentQuery from "../validations/logs";

router.get(
  "/",
  validateSentQuery.schemaForLatestLogs(),
  validationErrorsHandler,
  asyncErrorHandler(async (req, res, next) => {
    const queryResults = await getLatestCreatedLogs(req.query);
    res.status(200).send(queryResults);
  })
);

router.get("/test", (req, res, next) => {
  const queryResults = (result) => {
    db.query("SELECT * FROM systemlogs", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("tutorials: ", res);
      result(null, res);
    });
  };

  res.send(queryResults);
});

router.post("/new", (req, res) => {
  const {
    id,
    logWasCreated,
    logWasUploadedToApi,
    sendFromSource,
    sendFromSystem,
    sendFromCustomer,
    sendFromUser,
    shortDescription,
    longDescription,
    isShowingAnError,
    errorCode,
    errorDescription,
  } = req.body;
  try {
    db.promise().query(
      `INSERT INTO systemlogs (logWasCreated,logWasUploadedToApi,sendFromSource,sendFromSystem,sendFromCustomer,sendFromUser,shortDescription,longDescription,isShowingAnError,errorCode,errorDescription) VALUES('${logWasCreated}','${logWasUploadedToApi}','${sendFromSource}','${sendFromSystem}','${sendFromCustomer}','${sendFromUser}','${shortDescription}','${longDescription}','${isShowingAnError}','${errorCode}','${errorDescription}');`
    );
    res.status(201).send({ msg: "Created user" });
  } catch (error) {
    console.error(error);
  }
});

export default router;
