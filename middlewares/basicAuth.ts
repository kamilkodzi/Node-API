import ExpressError from "../helpers/ExpressError";
import { userController } from "../controllers/users";
import { asyncErrorHandler } from "../helpers/errorsHandlers";

export const basicAuth = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf("Basic ") === -1
  ) {
    next(new ExpressError("Missing authorization header - access denied", 401));
  } else {
    const base64Credentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const [username, password] = credentials.split(":");
    try {
      const user = await userController.authenticate({ username, password });
      if (!user)
        next(new ExpressError("Invalid Authentication Credentials", 401));
      req.user = user;
      next();
    } catch (error) {
      next(new ExpressError("Invalid Authentication Credentials", 401));
    }
  }
};
