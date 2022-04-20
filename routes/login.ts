import { Router } from "express";
import usersController from "../controllers/users";
import ExpressError from "../helpers/ExpressError";

const router = Router();
type LoginRequest = {
  username: string;
  password: string;
};

router.route("/login").post(async (req, res, next) => {
  const credentials: LoginRequest = req.body;
  const user = await usersController.authenticate(credentials);
  if (!user) {
    console.log("powienien poleciec next");
    next(new ExpressError("Invalid Authentication Credentials", 401));
  } else {
    //   @ts-ignore
    req.session.user = user;
    //   @ts-ignore
    req.session.authenticated = true;
    res.send({ user });
  }
});

export default router;
