import { Router } from "express";
import allowedResourcesController from "../controllers/allowedResources";
import errorHandler from "../helpers/errorsHandlers";
import allowedResourcesService from "../services/allowedResources";
import allowedResourcesValidation from "../validationAndSanitization/allowedResources";
const router = Router();

router.route("/allowedResources").get(allowedResourcesController.getRefreshAll);

//Remember to add refresh Singleton before showing what is in DB.
router
  .route("/allowedResources/:resourceName")
  .get(
    allowedResourcesValidation.contentValidationforGetMethod(),
    errorHandler.validationErrCatch,
    async (req, res) => {
      const xxx = await allowedResourcesService.getAllowedResourceByNameAndId(
        "customerstable"
      );
      res.send(
        "You choose to get all of the resources that stands behind: " +
          req.params.resourceName +
          "response form DB: " +
          JSON.stringify(xxx)
      );
    }
  );

router
  .route("/allowedResources/:resourceName/:id")
  .get(
    allowedResourcesValidation.contentValidationforGetMethod(),
    errorHandler.validationErrCatch,
    async (req, res) => {
      const xxx = await allowedResourcesService.getAllowedResourceByNameAndId(
        "customerstable"
      );
      res.send(
        "You choose to get all of the resources that stands behind: " +
          req.params.resourceName +
          "response form DB: " +
          JSON.stringify(xxx)
      );
    }
  );

router.route("/allowedResources/:resourceName/new").post((req, res) => {
  res.send(
    "You choose to post/create a new instnce of: " + req.params.resourceName
  );
});

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
