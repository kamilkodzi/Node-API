import "dotenv/config";
import express from "express";
import logsRoutes from "./routes/logs";
import errorsRoutes from "./routes/errors";
import ExpressError from "./helpers/ExpressError";
import errorMessageCreator from "./middlewares/errorMessageCreator";
import { requestTime } from "./middlewares/requestTime";
import helmet from "helmet";
const app = express();
const port = 4050;

app.use(helmet());
app.use(express.json());
app.use(requestTime);

app.use(logsRoutes);
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
app.listen(port, () => {
  console.log(`Logger is listening on port ${port}`);
});
