const { Router } = require("express");
const db = require("../config/database");
const router = Router();

const getLogsWithHttpQueryParams = (req, res, next) => {
  const { page } = req.query;
  console.log(page);
  // req.results = a
  next();
};

router.get("/", getLogsWithHttpQueryParams, async (req, res) => {
  const results = await db.promise().query(`SELECT * FROM systemlogs`);
  res.status(200).send(results[0]);
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

module.exports = router;
