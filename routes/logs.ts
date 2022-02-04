import {
  asyncErrorHandler,
  validationErrorsHandler,
} from "../helpers/errorsHandlers";
import { Router } from "express";
import validation from "../validations/logs";
import sanitization from "../sanitization/logs";
import logsControler from "../controllers/logs";

const router = Router();
router.get(
  "/",
  validation.forLatestLogs(),
  validationErrorsHandler,
  sanitization.forGettingLatestLogs,
  asyncErrorHandler(logsControler.getLatestCreatedLogs)
);

// router.post("/new", (req, res) => {
//   const {
//     id,
//     logWasCreated,
//     logWasUploadedToApi,
//     sendFromSource,
//     sendFromSystem,
//     sendFromCustomer,
//     sendFromUser,
//     shortDescription,
//     longDescription,
//     isShowingAnError,
//     errorCode,
//     errorDescription,
//   } = req.body;
//   try {
//     db.promise().query(
//       `INSERT INTO systemlogs (logWasCreated,logWasUploadedToApi,sendFromSource,sendFromSystem,sendFromCustomer,sendFromUser,shortDescription,longDescription,isShowingAnError,errorCode,errorDescription) VALUES('${logWasCreated}','${logWasUploadedToApi}','${sendFromSource}','${sendFromSystem}','${sendFromCustomer}','${sendFromUser}','${shortDescription}','${longDescription}','${isShowingAnError}','${errorCode}','${errorDescription}');`
//     );
//     res.status(201).send({ msg: "Created user" });
//   } catch (error) {
//     console.error(error);
//   }
// });

export default router;
