import { validationResult } from "express-validator";
import ExpressError from "./ExpressError";

export const asyncErrorHandler = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
};

export const validationErrorsHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    const extractedErrors = (): string => {
      let concatenatedErrorMessageFromValidation = "";
      return errors
        .array()
        .map(
          (err) =>
            (concatenatedErrorMessageFromValidation =
              " Provided parameter " + err.param) +
            " with value: " +
            err.value +
            " is not acceptable (" +
            err.msg +
            ")"
        )
        .toString()
        .trim();
    };

    next(new ExpressError(extractedErrors(), 400));
  }
};
