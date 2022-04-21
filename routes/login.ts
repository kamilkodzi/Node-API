import { Router } from "express";
import { crossOriginEmbedderPolicy } from "helmet";
import usersController from "../controllers/users";
import ExpressError from "../helpers/ExpressError";

const router = Router();
type LoginRequest = {
  username: string;
  password: string;
};

router.route("/login").post(async (req, res, next) => {
  //   @ts-ignore
  if (req.session.authenticated === true) {
    //   @ts-ignore
    res.send("juz zalogowany jako " + req.session.user.username);
  } else {
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
      res.send({ user: user.username, message: "You succesfully loged in" });
    }
  }
});

export default router;
