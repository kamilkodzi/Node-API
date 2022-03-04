const httpBodyAndQueries = {
  query_page: "page",
  query_rowslimit: "rowslimit",
  query_source: "source",
  query_customer: "customer",
  query_system: "system",
  body_logWasCreated: "logWasCreated",
  body_logWasUploadedToApi: "logWasUploadedToApi",
  body_sendFromSource: "sendFromSource",
  body_sendFromSystem: "sendFromSystem",
  body_sendFromCustomer: "sendFromCustomer",
  body_sendFromUser: "sendFromUser",
  body_shortDescription: "shortDescription",
  body_longDescription: "longDescription",
  body_isShowingAnError: "isShowingAnError",
  body_errorCode: "errorCode",
  body_errorDescription: "errorDescription",
  body_comment: "comment",
};

const apiResponseText = {
  get_responsePage: "page",
  get_responseMeta: "meta",
  get_responseData: "data",
  get_responseCountOfRowsReturnedByQuery: "rows",
  post_responseId: "insertId",
  get_allowedResourcesSystems: "systems",
  get_allowedResourcesSources: "sources",
  get_allowedResourcesCustomers: "customers",
};

const allowedCustomers = ["SUNSETINDUSTRIES", "HALBA", "ACME", "TEST-CUSTOMER"];
const allowedSources = ["KAMILPC", "DANIELPC", "VERR.DBF"];
const allowedSystems = ["RUOM", "POSTMAN", "BIOTOP", "EO"];

export = {
  httpBodyAndQueries,
  apiResponseText,
  allowedCustomers,
  allowedSources,
  allowedSystems,
};
