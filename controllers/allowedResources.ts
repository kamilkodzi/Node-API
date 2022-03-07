import apiResponseCreator from "../helpers/apiResponseGenerator";
import ExpressError from "../helpers/ExpressError";
import AllowedResources from "../helpers/AllowedResources";

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

const getRefreshAll = async (req, res, next) => {
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
  getRefreshAll,
  refreshAllInBackgrourn,
};
