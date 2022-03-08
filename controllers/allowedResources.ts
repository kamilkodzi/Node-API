import apiResponseCreator from "../helpers/apiResponseGenerator";
import ExpressError from "../helpers/ExpressError";
import AllowedResources from "../helpers/AllowedResources";
import allowedResourcesService from "..//services/allowedResources";
import consts from "../config/consts";
import databaseSchema from "../config/databaseSchema";

const getResourceByNameAndId = async (req, res, next) => {
  const resourceName = req.params.resourceName;
  const id = req.params.id;
  let queryResults;
  switch (resourceName) {
    case consts.httpParams.resourceValue_systems:
      queryResults =
        await allowedResourcesService.getAllowedResourceByNameAndId(
          databaseSchema.systemsTable.tab_tableName,
          id
        );
      break;
    case consts.httpParams.resourceValue_sources:
      queryResults =
        await allowedResourcesService.getAllowedResourceByNameAndId(
          databaseSchema.sourcesTable.tab_tableName,
          id
        );
      break;
    case consts.httpParams.resourceValue_customers:
      queryResults =
        await allowedResourcesService.getAllowedResourceByNameAndId(
          databaseSchema.customersTable.tab_tableName,
          id
        );
      break;
  }
  const apiAnswer = apiResponseCreator.createGetResponse(queryResults);
  res.status(200).send(apiAnswer);
};

const refreshAllInBackgrourn = async (req, res, next) => {
  try {
    await AllowedResources.refreshCustomers();
    await AllowedResources.refreshSystems();
    await AllowedResources.refreshSources();
  } catch (error) {
    console.log(
      "There is problem with fetching data from Customer, System and Source tables on server start"
    );
  }
  next();
};

const getSynchronizationInformation = async (req, res, next) => {
  let apiAnswer;
  try {
    const customersRefreshStatus = await AllowedResources.refreshCustomers();
    const systemsRefreshStatus = await AllowedResources.refreshSystems();
    const sourcesRefreshStatus = await AllowedResources.refreshSources();

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

export = {
  getResourceByNameAndId,
  getSynchronizationInformation,
  refreshAllInBackgrourn,
};
