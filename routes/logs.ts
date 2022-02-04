import { Router } from "express";
import { check, validationResult } from "express-validator";
import { stringify } from "querystring";
import db from "../config/databaseConfiguration";
import { getLatestCreatedLogs } from "../controllers/logs";
import {
  asyncErrorHandler,
  validationIncommingDataErrorHandler,
} from "../helpers/errorsHandlers";
import ExpressError from "../helpers/ExpressError";
const router = Router();
import validateIncommingClientData from "../validations/logs";
import validationTypes from "../config/validationTypesList";

const sanitizationMiddlewareTest = (req, res, next) => {
  req.query.rowsPerPage = 2;
  next();
};

router.get(
  "/",
  validateIncommingClientData(validationTypes.GET_LATEST_LOGS),
  //zastanowic sie czy nie zrobic funkcji - bo po nazwie to ciezko wyszukac co to ma byc a jesli funkcja to mozna si eodniesc do niej 
  validationIncommingDataErrorHandler,
  sanitizationMiddlewareTest,
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
