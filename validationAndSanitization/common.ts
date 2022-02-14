import ExpressError from "../helpers/ExpressError";

export const checkThatSendParamsMatchSchema = (
  arrayWithAcceptableParams: string[]
) => {
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
