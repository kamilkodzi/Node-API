import { Console } from "console";
import { Router } from "express";
import db from "../config/database";
import getAllRows from "../controllers/logsQueries";
const router = Router();

const getLogsWithHttpQueryParams = async (req, res, next) => {
  const { page, rowsPerPage } = req.query;
  console.log(page);
  console.log(page);
  // req.results = await getAllRows(page, rowsPerPage);
  console.log(req.results);
  next();
};

const parseHttpQuery = (req, res, next) => {
  let parsedPage: number;
  let parsedRowsPerPage: number;
  const { page, rowsPerPage } = req.query;

  if (page) {
    parsedPage = parseInt(req.query.page.toString(), 10);
    req.query.page = parsedPage;
  }
  if (rowsPerPage) {
    parsedRowsPerPage = parseInt(req.query.rowsPerPage.toString(), 10);
    req.query.rowsPerPage = parsedRowsPerPage;
  }

  next();
};

router.get("/", async (req, res) => {
  // const { page:number, rowsPerPage:number } = req.query
  const { page, rowsPerPage } = req.query;
  let queryResults;
  // console.log("Tutaj pokazjuemr req: ", req);
  // console.log(typeof req.query);
  // const pageInNumber: number = parseInt(req.query.page.toString(), 10);
  // const rowsPerPage: number = parseInt(req.query.rowsPerPage.toString(), 10);
  // if (req.query && Object.keys(req.query).length === 0) {
  // queryResults = await getAllRows();
  // } else {
  queryResults = await getAllRows(req.query);
  // }

  // const queryResults = await getAllRows(req.query);
  res.status(200).send(queryResults);

  // res.status(401).send({ message: "bad request" });

  // const page:number =parseInt(req.query.page.toString(),10)
  // const rowsPerPage:number =parseInt(req.query.page.toString(),10)
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
