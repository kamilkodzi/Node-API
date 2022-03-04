import dbSchema from "../config/databaseSchema";
import allowedResourcesService from "../services/allowedResources";
import apiResponseCreator from "../helpers/apiResponseGenerator";
import consts from "../config/consts";
import ExpressError from "../helpers/ExpressError";

var allowedCustomersSingleton = consts.allowedCustomers;
var allowedSourcesSingleton = consts.allowedSources;
var allowedSystemsSingleton = consts.allowedSystems;

const getRefreshAll = async (req, res, next) => {
  let systemsRefreshStatus;
  let sourcesRefreshStatus;
  let customersRefreshStatus;
  let apiAnswer;
  try {
    const systemsRefreshStatus = await refreshSystems();
    const sourcesRefreshStatus = await refreshSources();
    const customersRefreshStatus = await refreshCustomers();
    apiAnswer = apiResponseCreator.createAfterRefreshAllowedResourcesResponse(
      systemsRefreshStatus,
      sourcesRefreshStatus,
      customersRefreshStatus
    );
  } catch (error) {
    next(
      new ExpressError(
        "There is problem with refreshing list of allowed resources. Immediately contact with your administrator for restarting server",
        500
      )
    );
  }
  res.send(apiAnswer);
};


const refreshSources = async () => {};
const refreshCustomers = async () => {
  
};

const refreshResource = async () => {
  
};

const refreshSystems = async () => {
  let refreshResults;
  try {
    await allowedResourcesService
      .getSystems()
      .then((queryResults: Array<[]>) => {
        if (queryResults[0] && queryResults[0] !== []) {
          const resultsValues = queryResults.map((result) => {
            return result[dbSchema.systemsTable.col_systemName];
          });
          allowedSystemsSingleton = resultsValues;
          refreshResults = {
            status: "refreshed",
            onServer: allowedSystemsSingleton,
          };
        } else {
          refreshResults = {
            status: "not-refreshed",
            onServer: allowedSystemsSingleton,
          };
        }
      });
  } catch (error) {
    refreshResults = {
      status: "not-refreshed",
      onServer: allowedSystemsSingleton,
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
  refreshSystems,
  allowedSystems,
  allowedSources,
  allowedCustomers,
  getRefreshAll,
};
