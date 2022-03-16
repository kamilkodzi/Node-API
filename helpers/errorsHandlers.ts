import { validationResult } from "express-validator";
import ExpressError from "./ExpressError";

const asyncErrCatch = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
};

const validationErrCatch = (req, res, next) => {
  const errors = validationResult(req);
  let concatenatedErrorMessageFromValidation = "";
  if (errors.isEmpty()) {
    return next();
  } else {
    const extractedErrors = (): string => {
      return errors
        .array()
        .map((err) => {
          if (err.nestedErrors) {
            err.nestedErrors.map((nestedErr) => {
              concatenatedErrorMessageFromValidation =
                concatenatedErrorMessageFromValidation +
                " Provided parameter " +
                nestedErr.param +
                " with value: " +
                nestedErr.value +
                " is not acceptable (" +
                nestedErr.msg +
                ")";
            });
            return concatenatedErrorMessageFromValidation;
          } else {
            return (concatenatedErrorMessageFromValidation =
              " Provided parameter " +
              err.param +
              " with value: " +
              err.value +
              " is not acceptable (" +
              err.msg +
              ")");
          }
        })
        .toString()
        .trim();
    };
    next(new ExpressError(extractedErrors(), 400));
  }
};

const errorHandler = {
  asyncErrCatch,
  validationErrCatch,
};

export default errorHandler;
