import apiResponseCreator from "../helpers/apiResponseGenerator";
import ExpressError from "../helpers/ExpressError";
import AllowedResources from "../helpers/AllowedResources";

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
};
