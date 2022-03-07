import { Router } from "express";
import allowedResourcesController from "../controllers/allowedResources";
const router = Router();

router.route("/allowedResources").get(allowedResourcesController.getRefreshAll);

export default router;
