import consts from "../config/consts";

const createGetResponse = (
  dataFromDatabase,
  rowslimitSendByClient = undefined,
  pageSendByClient = undefined,
  queryResultsLenght = undefined
) => {
  const responseDataText = consts.apiResponseText.get_responseData;
  const resonseMetaText = consts.apiResponseText.get_responseMeta;
  const responsePageText = consts.apiResponseText.get_responsePage;
  const responseRowLimits = consts.httpBodyAndQueries.rowslimit;
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
    [postResponseId]: data,
  };
};

const createAfterRefreshAllowedResourcesResponse = (
  systemsResults,
  sourcesResults,
  customersResults
) => {
  const responseDataText = consts.apiResponseText.get_responseData;
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

const authenticationResponse = (sessionStatus = false, user = null) => {
  const statusResponseText =
    consts.apiResponseText.authentication_status_response;
  const userResponseText = consts.apiResponseText.authentication_user_response;

  return {
    [userResponseText]: user,
    [statusResponseText]: sessionStatus,
  };
};

export = {
  authenticationResponse,
  createGetResponse,
  createPostResponse,
  createAfterRefreshAllowedResourcesResponse,
};
