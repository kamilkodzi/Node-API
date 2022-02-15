import {
  apiResponseText as apiRes,
  httpBodyAndQueriesConsts,
} from "../config/consts";

const createGetResponse = (
  dataFromDatabase,
  rowslimitSendByClient,
  pageSendByClient,
  queryResultsLenght
) => {
  const responseDataText = apiRes.get_responseData;
  const resonseMetaText = apiRes.get_responseMeta;
  const responsePageText = apiRes.get_responsePage;
  const responseRowLimits = httpBodyAndQueriesConsts.query_rowslimit;
  const responseRowsAmountText = apiRes.get_responseCountOfRowsReturnedByQuery;

  return {
    [resonseMetaText]: {
      [responseRowsAmountText]: queryResultsLenght,
      [responseRowLimits]: rowslimitSendByClient,
      [responsePageText]: pageSendByClient,
    },
    [responseDataText]: dataFromDatabase,
  };
};

const createPostResponse = (data) => {
  const postResponseId = apiRes.post_responseId;

  return {
    [postResponseId]: data["insertId"],
  };
};

const apiResponseCreator = { createGetResponse, createPostResponse };
export default apiResponseCreator;
