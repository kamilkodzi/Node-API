import getOffset from "../helpers/offsetQueries";
import { systemlogsSchema } from "../models/logs";
import { getLatestLogsQuery } from "../services/logs";
import { httpBodyAndQueriesConsts as httpQry } from "../config/consts";

const getLatestCreatedLogs = async (req, res, next) => {
  const page = req.query[httpQry.query_page];
  const rowslimit = req.query[httpQry.query_rowslimit];
  const pageTurnedInToOffset = getOffset(page, rowslimit);

  const queryResults = await getLatestLogsQuery(
    pageTurnedInToOffset,
    rowslimit,
    systemlogsSchema.col_id
  );
  const apiAnswer = {
    data: queryResults,
    meta: { page: page },
  };
  res.status(200).send(apiAnswer);
};

const addNewLog = async (req, res, next) => {
  // const {}
};

export = {
  getLatestCreatedLogs,
  addNewLog,
};
