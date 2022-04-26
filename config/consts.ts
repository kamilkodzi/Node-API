const httpBodyAndQueries = {
  page: "page",
  rowslimit: "rowslimit",
  source: "source",
  customer: "customer",
  system: "system",
  allowedResourceName: "allowedResourceName",
  comments: "comments",
  logWasCreated: "logWasCreated",
  logWasUploadedToApi: "logWasUploadedToApi",
  sendFromSource: "sendFromSource",
  sendFromSystem: "sendFromSystem",
  sendFromCustomer: "sendFromCustomer",
  sendFromUser: "sendFromUser",
  shortDescription: "shortDescription",
  longDescription: "longDescription",
  isShowingAnError: "isShowingAnError",
  errorCode: "errorCode",
  errorDescription: "errorDescription",
  username: "username",
  password: "password",
};
const httpParams = {
  resourceName: "resourceName",
  resourceValue_systems: "systems",
  resourceValue_customers: "customers",
  resourceValue_sources: "sources",
  id: "id",
};

const apiResponseText = {
  get_responsePage: "page",
  get_responseMeta: "meta",
  get_responseData: "data",
  get_handfulInformation: "info",
  get_responseCountOfRowsReturnedByQuery: "rows",
  post_responseId: "insertId",
  get_allowedResourcesSystems: "systems",
  get_allowedResourcesSources: "sources",
  get_allowedResourcesCustomers: "customers",
  get_allowedResourcesStatusSynchronized: "synchronised",
  get_allowedResourcesStatus_NOT_Synchronized: "not synchronised",
  authentication_status_response: "status",
  authentication_user_response: "user",
};

const allowedCustomers = [
  "SUNSETINDUSTRIES",
  "HALBA",
  "FALLOUT",
  "TEST-CUSTOMER",
];
const allowedSources = ["KAMILPC", "SOMETABLE.ACC", "CUSTOMER.DB"];
const allowedSystems = ["EXCEL-XYZ", "POSTMAN", "FACEBOOK", ""];

export = {
  httpBodyAndQueries,
  apiResponseText,
  allowedCustomers,
  allowedSources,
  allowedSystems,
  httpParams,
};
