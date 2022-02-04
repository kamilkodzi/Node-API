import getOffset from "../helpers/offsetQueries";
import { systemlogsSchema } from "../models/logs";
import { getLatestLogsQuery } from "../services/logs";

const getLatestCreatedLogs = async (req, res, next) => {
  const { page, rowslimit } = req.query;
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

export = {
  getLatestCreatedLogs,
};
