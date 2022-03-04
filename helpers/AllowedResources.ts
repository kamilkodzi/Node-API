import dbSchema from "../config/databaseSchema";
import allowedResourcesService from "../services/allowedResources";
import consts from "../config/consts";

var allowedCustomersSingleton = consts.allowedCustomers;
var allowedSourcesSingleton = consts.allowedSources;
var allowedSystemsSingleton = consts.allowedSystems;

const refreshSystems = async () => {
  return refreshDeclaredResource(
    dbSchema.systemsTable.col_systemName,
    allowedResourcesService.getSystems(),
    allowedSystemsSingleton
  );
};

const refreshSources = async () => {
  return refreshDeclaredResource(
    dbSchema.sourcesTable.col_systemName,
    allowedResourcesService.getSources(),
    allowedSourcesSingleton
  );
};

const refreshCustomers = async () => {
  return refreshDeclaredResource(
    dbSchema.customersTable.col_systemName,
    allowedResourcesService.getCustomers(),
    allowedCustomersSingleton
  );
};

const refreshDeclaredResource = async (
  columnName,
  asyncFunctionTogetDataFromDatabase,
  singletonToUpdate
) => {
  let refreshResults;
  let onServer;
  try {
    await asyncFunctionTogetDataFromDatabase.then((queryResults: Array<[]>) => {
      if (queryResults[0] && queryResults[0] !== []) {
        const resultsValues = queryResults.map((result) => {
          return result[columnName];
        });
        switch (true) {
          case singletonToUpdate === allowedSystemsSingleton:
            allowedSystemsSingleton = resultsValues;
            onServer = allowedSystemsSingleton;
            break;
          case singletonToUpdate === allowedSourcesSingleton:
            allowedSourcesSingleton = resultsValues;
            onServer = allowedSourcesSingleton;
            break;
          case singletonToUpdate === allowedCustomersSingleton:
            allowedCustomersSingleton = resultsValues;
            onServer = allowedCustomersSingleton;
            break;
        }
        refreshResults = {
          status: "refreshed",
          onServer: onServer,
        };
      } else {
        refreshResults = {
          status: "not-refreshed",
          onServer: singletonToUpdate,
        };
      }
    });
  } catch (error) {
    refreshResults = {
      status: "not-refreshed",
      onServer: singletonToUpdate,
    };
  }
  return refreshResults;
};

const allowedSystems = () => {
  return allowedSystemsSingleton;
};

const allowedSources = () => {
  return allowedSourcesSingleton;
};

const allowedCustomers = () => {
  return allowedCustomersSingleton;
};

export = {
  refreshCustomers,
  refreshSystems,
  refreshSources,
  allowedSystems,
  allowedSources,
  allowedCustomers,
};