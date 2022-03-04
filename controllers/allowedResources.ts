import dbSchema from "../config/databaseSchema";
import allowedResourcesService from "../services/allowedResources";
import apiResponseCreator from "../helpers/apiResponseGenerator";
import {
  allowedCustomers,
  allowedSources,
  allowedSystems,
} from "../config/consts";
import ExpressError from "../helpers/ExpressError";

var allowedCustomersSingleton = allowedCustomers;
var allowedSourcesSingleton = allowedSources;
var allowedSystemsSingleton = allowedSystems;

const refreshSources = async () => {};
const refreshCustomers = async () => {};

const refreshAllowedResources = async (req, res, next) => {
  let systemRefreshStatus;
  let apiAnswer;
  try {
    const systemRefreshStatus = await refreshSystems();
    //Dodać Sources
    //Dodać Customers
    apiAnswer = apiResponseCreator.createAfterRefreshAllowedResourcesResponse(
      systemRefreshStatus,
      "N/A",
      "N/A"
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

const getAllowedSystems = () => {
  return allowedSystemsSingleton;
};

const getAllowedSources = () => {
  return allowedSourcesSingleton;
};

const getAllowedCustomers = () => {
  return allowedCustomersSingleton;
};

export = {
  refreshSystems,
  getAllowedSystems,
  getAllowedSources,
  getAllowedCustomers,
  refreshAllowedResources,
};
