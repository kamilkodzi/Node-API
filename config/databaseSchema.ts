const systemlogsTablel = {
  tab_tableName: "systemlogs",
  col_id: "id",
  col_logWasCreated: "logWasCreated",
  col_logWasUploadedToApi: "logWasUploadedToApi",
  col_sendFromSource: "sendFromSource",
  col_sendFromSource_max_length: 15,
  col_sendFromSystem: "sendFromSystem",
  col_sendFromSystem_max_length: 15,
  col_sendFromCustomer: "sendFromCustomer",
  col_sendFromCustomer_max_length: 15,
  col_sendFromUser: "sendFromUser",
  col_sendFromUser_max_length: 30,
  col_shortDescription: "shortDescription",
  col_shortDescription_max_length: 60,
  col_longDescription: "longDescription",
  col_longDescription_max_length: 3000,
  col_isShowingAnError: "isShowingAnError",
  col_errorCode: "errorCode",
  col_errorCode_max_length: 60,
  col_errorDescription: "errorDescription",
  col_errorDescription_max_length: 3000,
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
  col_systemName_max_lengths: 15,
  col_comments: "comments",
  col_comments_max_length: 255,
};

const sourcesTable = {
  tab_tableName: "sourcestable",
  col_systemName: "sourceName",
  col_systemName_max_length: 15,
  col_comments: "comments",
  col_comments_max_length: 255,
};

const customersTable = {
  tab_tableName: "customerstable",
  col_systemName: "customerName",
  col_systemName_max_length: 15,
  col_comments: "comments",
  col_comments_max_length: 255,
};

export = {
  systemlogsTablel,
  loggerusersTable,
  systemsTable,
  sourcesTable,
  customersTable,
};
