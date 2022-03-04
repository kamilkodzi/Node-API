const systemlogsTablel = {
  tab_tableName: "systemlogs",
  col_id: "id",
  col_logWasCreated: "logWasCreated",
  col_logWasUploadedToApi: "logWasUploadedToApi",
  col_sendFromSource: "sendFromSource",
  col_sendFromSystem: "sendFromSystem",
  col_sendFromCustomer: "sendFromCustomer",
  col_sendFromUser: "sendFromUser",
  col_shortDescription: "shortDescription",
  col_longDescription: "longDescription",
  col_isShowingAnError: "isShowingAnError",
  col_errorCode: "errorCode",
  col_errorDescription: "errorDescription",
  col_comment: "comment",
  col_preventDuplicateId2: "preventDuplicateId2",
};

const loggerusersTable = {
  tab_tableName: "loggerusers",
  col_username: "username",
  col_password: "password",
  col_isAdmin: "isAdmin",
};

const systemsTable = {
  tab_tableName: "systemstable",
  col_systemName: "systemName",
};

const sourcesTable = {
  tab_tableName: "sourcestable",
  col_systemName: "sourceName",
};

const customersTable = {
  tab_tableName: "customerstable",
  col_systemName: "customerName",
};

export = {
  systemlogsTablel,
  loggerusersTable,
  systemsTable,
  sourcesTable,
  customersTable,
};
