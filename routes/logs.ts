import { Router } from "express";
import db from "../config/database";
import getLatestLogs from "../controllers/logsQueries";
import asyncErrorHandler from "../helpers/asyncErrorHandler";
import ExpressError from "../helpers/ExpressError";
const router = Router();

router.get(
  "/",
  asyncErrorHandler(async (req, res, next) => {
    const queryResults = await getLatestLogs(req.query);
    if (queryResults) {
      throw new ExpressError(
        "Can`t find logs while connecting to database",
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
