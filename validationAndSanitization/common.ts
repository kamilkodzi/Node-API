import ExpressError from "../helpers/ExpressError";

const structureValidation = (arrayWithAcceptableParams: string[]) => {
  return (req, res, next) => {
    if (req.query == {} && req.body == {}) {
      next();
    }
    const queriesInQuery = Object.keys(req.query);
    const queriesInBody = Object.keys(req.body);

    queriesInQuery.map((paramName) => {
      if (arrayWithAcceptableParams.indexOf(paramName) > -1) {
      } else {
        next(
          new ExpressError(
            `Parameter you provided: ${paramName} is not valid parameter for this API call.`,
            400
          )
        );
      }
    });
    queriesInBody.map((paramName) => {
      if (arrayWithAcceptableParams.indexOf(paramName) > -1) {
      } else {
        next(
          new ExpressError(
            `Parameter you provided: ${paramName} is not valid parameter for this API call.`,
            400
          )
        );
      }
    });

    next();
  };
};

const chceckThatValueIsAllowedRosource = (
  value: string,
  resourceList: Function
) => {
  const allowedArray = resourceList();
  if (!allowedArray.includes(value)) {
    throw new Error(
      "Be sure that value is one of the following: " + allowedArray
    );
  }
  return true;
};

export = {
  structureValidation,
  chceckThatValueIsAllowedRosource,
};
