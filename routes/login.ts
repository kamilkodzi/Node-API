import { Router } from "express";
import usersController from "../controllers/users";
import errorHandler from "../helpers/errorsHandlers";
import commonValidation from "../validationAndSanitization/common";
import loginValidation from "../validationAndSanitization/login";

const router = Router();

router.route("/isLoggedIn").get(
  commonValidation.structureValidation(
    loginValidation.structureSchemaForGetMethod,
    {
      searchInQueryParams: true,
      searchInBody: true,
      searchInRouteParams: true,
    }
  ),
  usersController.isLogedIn
);

router.route("/login").post(
  commonValidation.structureValidation(
    loginValidation.structureSchemaForPostMethod,
    {
      searchInQueryParams: true,
      searchInBody: true,
      searchInRouteParams: true,
    }
  ),
  loginValidation.contentValidationforPostMethod(),
  errorHandler.validationErrCatch,
  errorHandler.asyncErrCatch(usersController.logIn)
);

export default router;
