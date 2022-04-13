import ExpressError from "../helpers/ExpressError";
import usersController from "../controllers/users";

const basicAuth = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf("Basic ") === -1
  ) {
    next(new ExpressError("Missing authorization header - access denied", 401));
  } else if (req.session.authenticated === true) {
    next();
  } else {
    const base64Credentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const [username, password] = credentials.split(":");
    try {
      const user = await usersController.authenticate({ username, password });
      if (!user)
        next(new ExpressError("Invalid Authentication Credentials", 401));
      req.session.user = user;
      req.session.authenticated = true;
      next();
    } catch (error) {
      next(error);
    }
  }
};

export default basicAuth;
