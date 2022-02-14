import {
  apiResponseText as apiRes,
  httpBodyAndQueriesConsts,
} from "../config/consts";
import apiConfig from "../config/apiConfig";

export const generateGetResponse = (
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

export const generatePostResponse = (data) => {
  const postResponseId = apiRes.post_responseId;

  return {
    [postResponseId]: data["insertId"],
  };
};
