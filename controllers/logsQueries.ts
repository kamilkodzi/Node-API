import db from "../config/database";
import helper from "../helpers/offsetQueries";
import apiConfig from "../config/apiConfig";
import { Console } from "console";

async function getAllRows(query: any) {
  const alternativeMaxRowsPerGetRequest = apiConfig.maximumRowsPerGetRequest;
  let { page, rowsPerPage } = query;
  if (!page) {
    page = 1;
    console.log(
      "Wynik !page to: ",
      !page,
      " co oznacza, ze ustawilismy defaultowy page na 1"
    );
  } else {
    console.log("wslalismy page przez query stringa i wynosi: ", query.page);
  }
  if (!rowsPerPage) {
    rowsPerPage = 100;
    console.log(
      "Wynik !rowsLimit to: ",
      !rowsPerPage,
      " co oznacza, ze ustawilismy defaultowy page na 100"
    );
  } else {
    console.log(
      "wslalismy rowsLimit przez query stringa i wynosi: ",
      query.rowsPerPage
    );
  }

  // isNaN(page) ? (page = 1) : page;
  // isNaN(rowsLimit) ? (rowsLimit = alternativeMaxRowsPerGetRequest) : rowsLimit;
  const rows = await db
    .promise()
    .query(`SELECT * FROM systemlogs ORDER BY id DESC LIMIT ?,?`, [
      Number(page),
      Number(rowsPerPage),
    ]);
  const data = helper.emptyOrRows(rows[0]);
  const meta = { page };
  return {
    data,
    meta,
  };
}

export default getAllRows;
