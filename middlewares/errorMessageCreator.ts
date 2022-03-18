import ExpressError from "../helpers/ExpressError";

const errorMessageCreator = (err, req: any, res, next) => {
  console.log(
    `There is error: ${JSON.stringify(
      err
    )}. Request was send in to route: ${JSON.stringify(
      req.url
    )}. Boody contains: ${JSON.stringify(
      req.body
    )}. Query contains: ${JSON.stringify(req.query)}`
  );

  const { code, message, type } = err;
  switch (true) {
    case code == "ER_DUP_ENTRY":
      next(
        new ExpressError(
          "Already in database. To prevent duplicates in database, this request will be refused",
          422
        )
      );
      break;
    case code == "ER_SP_UNDECLARED_VAR":
      next(
        new ExpressError(
          "There are problems while interacting with database - one or many arguments are undeclared",
          400
        )
      );
      break;

    case code == "ER_PARSE_ERROR":
      console.log(err);
      next(
        new ExpressError(
          "There are problems while interacting with database - one or many arguments are declared wrongly",
          400
        )
      );
      break;

    case code == "ER_ACCESS_DENIED_ERROR":
      next(
        new ExpressError(
          "There are problems while interacting with database - credentials are not valid and service can`t connect with database - contact with your administrator",
          500
        )
      );
      break;

    case type == "entity.parse.failed":
      next(
        new ExpressError(
          "Server understand only messages send in JSON format, double - check your input",
          400
        )
      );
      break;

    case code == "ENOTFOUND":
      next(
        new ExpressError(
          "Server have problem with with establishing connection to database - contact with your administrator",
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
