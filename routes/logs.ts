import {
  asyncErrorHandler,
  validationErrorsHandler,
} from "../helpers/errorsHandlers";
import { Router } from "express";
import validation from "../validationAndSanitization/logs";
import mutate from "../mutators/logs";
import logsControler from "../controllers/logs";

const router = Router();
router.get(
  "/",
  validation.validationForLatestLogs(),
  validationErrorsHandler,
  mutate.mutateGetQueryForLatestLogs,
  asyncErrorHandler(logsControler.getLatestCreatedLogs)
);

router.post("/", asyncErrorHandler(logsControler.addNewLog));
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
