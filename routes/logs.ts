import { Router } from "express";
import { check, validationResult } from "express-validator";
import { stringify } from "querystring";
import db from "../config/database";
import getLatestLogs from "../controllers/logsQueries";
import {
  asyncErrorHandler,
  validationAndSanitizationErrorHandler,
} from "../helpers/ErrorHandlers";
import ExpressError from "../helpers/ExpressError";
const router = Router();

router.get(
  "/",

  // validationAndSanitizationErrorHandler(
  check("page").isInt({ gt: 0 }).optional(),
  // ),
  asyncErrorHandler(async (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      // console.log(validationErrors);
      // dodać funcję opakowywyujaco która jako middleware ogarnie ten error handling z walidacji i sanityzacji z errorami :O
      throw new ExpressError(
        "Validation error- entered data by you is invalid",
        400
      );
    }
    const queryResults = await getLatestLogs(req.query);
    if (!queryResults) {
      throw new ExpressError(
        "There are problems with recieving data you requested - try again or contact with your administrator",
        500
      );
    }
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
