import "dotenv/config";
import express from "express";
import logsRoutes from "./routes/logs";
import errorsRoutes from "./routes/errors";
import allowedResources from "./routes/allowedResources";
import ExpressError from "./helpers/ExpressError";
import errorMessageCreator from "./middlewares/errorMessageCreator";
import requestTime from "./middlewares/requestTime";
import helmet from "helmet";
import basicAuth from "./middlewares/basicAuth";
import lastUpdateRoutes from "./routes/lastUpdate";
import allowedController from "./controllers/allowedResources";
import makeUrlToLowerCase from "./mutators/toLowerCaseURL";
import session from "express-session";
import { allowCors } from "./middlewares/allowCorsDomain";
import config from "./config/apiConfig";
const app = express();

app.use(session(config.sessionConfig));
app.use(express.json());
app.use(helmet());
app.use(allowCors);
app.use(makeUrlToLowerCase);
app.use(requestTime.requestTime);
app.use(allowedController.refreshAllInBackgrourn);

app.use(basicAuth);
app.use(allowedResources);
app.use(logsRoutes);
app.use(lastUpdateRoutes);
app.use(errorsRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError("Server could not understand your request", 400));
});

app.use(errorMessageCreator);
app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  res.status(statusCode).send({
    status: statusCode,
    message: message,
  });
});

app.listen(config.apiConfig.port, () => {
  console.log(`Logger is listening on port ${config.apiConfig.port}`);
});
