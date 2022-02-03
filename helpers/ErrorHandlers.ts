import ExpressError from "./ExpressError";

export const asyncErrorHandler = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
};

export const validationAndSanitizationErrorHandler = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => {
      console.log(req);
      next(new ExpressError("There is problem with validation your data", 400));
    });
  };
};
