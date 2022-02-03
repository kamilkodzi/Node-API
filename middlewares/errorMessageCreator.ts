import ExpressError from "../helpers/ExpressError";

const errorMessageCreator = (err, req, res, next) => {
  const { code, message } = err;
  switch (code) {
    case "ER_SP_UNDECLARED_VAR":
      next(
        new ExpressError(
          "There are problems while interacting with database - one or many arguments are undeclared",
          400
        )
      );
      break;
    case "ER_PARSE_ERROR":
      next(
        new ExpressError(
          "There are problems while interacting with database - one or many arguments are declared wrongly",
          400
        )
      );
      break;

    case "ER_ACCESS_DENIED_ERROR":
      next(
        new ExpressError(
          "There are problems while interacting with database - credentials are not valid and service can`t connect with database - constact with your administrator",
          500
        )
      );
      break;
    default:
      err = unexpectedErrorsHandler(err);
      next(err);
  }
};

const unexpectedErrorsHandler = (err) => {
  // Do some logic here
  if (err instanceof ExpressError) {
    return err;
  } else {
    console.log(err);
    return new ExpressError(
      "Unhandled exception - please contact with your administrator",
      500
    );
  }
};

export default errorMessageCreator;
