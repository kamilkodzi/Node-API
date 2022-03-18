import apiResponseCreator from "../helpers/apiResponseGenerator";
import ExpressError from "../helpers/ExpressError";
import AllowedResources from "../helpers/AllowedResources";
import allowedResourcesService from "..//services/allowedResources";
import consts from "../config/consts";
import databaseSchema from "../config/databaseSchema";

const postResources = async (req, res, next) => {
  const resourceToAdd = req.params[consts.httpParams.resourceName];
  const newName = req.body[consts.httpBodyAndQueries.allowedResourceName];
  const commentToAdd = req.body[consts.httpBodyAndQueries.comments];
  const tableName = determineTableBasingOnUrlParam(resourceToAdd);
  const queryResults = await allowedResourcesService.addNewAllowedResource(
    tableName,
    newName,
    commentToAdd
  );
  const apiAnswer = apiResponseCreator.createPostResponse(queryResults);
  res.status(201).send(apiAnswer);
};

const getResourceByNameAndId = async (req, res, next) => {
  const resourceName = req.params[consts.httpParams.resourceName];
  const id = req.params.id;
  const tableName = determineTableBasingOnUrlParam(resourceName);
  const queryResults =
    await allowedResourcesService.getAllowedResourceByNameAndId(tableName, id);
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

const determineTableBasingOnUrlParam = (urlParam: string) => {
  let tableName = undefined;
  switch (urlParam) {
    case consts.httpParams.resourceValue_systems:
      tableName = databaseSchema.systemsTable.tab_tableName;
      break;
    case consts.httpParams.resourceValue_sources:
      tableName = databaseSchema.sourcesTable.tab_tableName;
      break;
    case consts.httpParams.resourceValue_customers:
      tableName = databaseSchema.customersTable.tab_tableName;
      break;
  }
  return tableName;
};

export = {
  postResources,
  getResourceByNameAndId,
  getSynchronizationInformation,
  refreshAllInBackgrourn,
};
