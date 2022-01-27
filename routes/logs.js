const { Router } = require("express");
const db = require("../config/database");
const router = Router();
const { getAllRows } = require("../controllers/logsQueries");

const getLogsWithHttpQueryParams = async (req, res, next) => {
  const { page, rowsPerPage } = req.query;
  console.log(page);
  console.log(page);
  req.results = await getAllRows(page, rowsPerPage);
  console.log(req.results);
  next();
};

router.get("/", async (req, res) => {
  const { page, rowsPerPage } = req.query;
  console.log(page);
  queryResults = await getAllRows(page, rowsPerPage);
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

module.exports = router;
