import consts from "../config/consts";

const createGetResponse = (
  dataFromDatabase,
  rowslimitSendByClient,
  pageSendByClient,
  queryResultsLenght
) => {
  const responseDataText = consts.apiResponseText.get_responseData;
  const resonseMetaText = consts.apiResponseText.get_responseMeta;
  const responsePageText = consts.apiResponseText.get_responsePage;
  const responseRowLimits = consts.httpBodyAndQueries.query_rowslimit;
  const responseRowsAmountText =
    consts.apiResponseText.get_responseCountOfRowsReturnedByQuery;

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
  const postResponseId = consts.apiResponseText.post_responseId;

  return {
    [postResponseId]: data["insertId"],
  };
};

const createAfterRefreshAllowedResourcesResponse = (
  systemsResults,
  sourcesResults,
  customersResults
) => {
  const resonseMetaText = consts.apiResponseText.get_responseMeta;
  const responseDataText = consts.apiResponseText.get_responseData;
  const handfulInformation = consts.apiResponseText.get_handfulInformation;
  const responseSystemsRefreshText =
    consts.apiResponseText.get_allowedResourcesSystems;
  const responseSourcesRefreshText =
    consts.apiResponseText.get_allowedResourcesSources;
  const responseCustomersRefreshText =
    consts.apiResponseText.get_allowedResourcesCustomers;

  return {
    [responseDataText]: {
      [responseSystemsRefreshText]: systemsResults,
      [responseSourcesRefreshText]: sourcesResults,
      [responseCustomersRefreshText]: customersResults,
    },
  };
};

export = {
  createGetResponse,
  createPostResponse,
  createAfterRefreshAllowedResourcesResponse,
};
