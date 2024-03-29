import { Router } from "express";
import allowedResourcesController from "../controllers/allowedResources";
import errorHandler from "../helpers/errorsHandlers";
import allowedResourcesValidation from "../validationAndSanitization/allowedResources";
import commonValidation from "../validationAndSanitization/common";

const router = Router();

router.route("/allowedResources").get(
  commonValidation.structureValidation([], {
    searchInQueryParams: true,
    searchInBody: true,
  }),
  allowedResourcesController.getSynchronizationInformation
);

router.route("/allowedResources/:resourceName/:id?").get(
  commonValidation.structureValidation([], {
    searchInQueryParams: true,
    searchInBody: true,
  }),
  allowedResourcesValidation.contentValidationforGetMethod(),
  errorHandler.validationErrCatch,
  errorHandler.asyncErrCatch(allowedResourcesController.getResourceByNameAndId)
);

router
  .route("/allowedResources/:resourceName/new")
  .post(
    commonValidation.structureValidation(
      allowedResourcesValidation.structureSchemaForPostMethod,
      { searchInBody: true }
    ),
    commonValidation.structureValidation(
      allowedResourcesValidation.structureSchemaForAllowedParamInRoute,
      { searchInRouteParams: true }
    ),
    allowedResourcesValidation.contentValidationforPostMethod(),
    errorHandler.validationErrCatch,
    errorHandler.asyncErrCatch(allowedResourcesController.postResources)
  );


router.route("/allowedResources/:resourceName/:id").put((req, res) => {
  res.send(
    "You choose to edit " +
      req.params.resourceName +
      "`s resource that has id equal to: " +
      req.params.id
  );
});


router.route("/allowedResources/:resourceName/:id").delete((req, res) => {
  res.send(
    "You choose to delete a " +
      req.params.resourceName +
      " that`s id is equal to: " +
      req.params.id
  );
});

export default router;
