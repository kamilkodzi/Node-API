import { Router } from "express";
import db from "../config/database";
import getLatestLogs from "../controllers/logsQueries";
const router = Router();



router.get("/", async (req, res) => {
  const queryResults = await getLatestLogs(req.query);

  res.status(200).send(queryResults);

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
