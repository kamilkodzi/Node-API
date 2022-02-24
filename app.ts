import "dotenv/config";
import express from "express";
import logsRoutes from "./routes/logs";
import errorsRoutes from "./routes/errors";
import ExpressError from "./helpers/ExpressError";
import errorMessageCreator from "./middlewares/errorMessageCreator";
import requestTime from "./middlewares/requestTime";
import helmet from "helmet";
import basicAuth from "./middlewares/basicAuth";

const app = express();
const port = 4050;
app.use(express.json());


app.use(helmet());
app.use(requestTime);

app.use(basicAuth, logsRoutes);
app.use(basicAuth, errorsRoutes);

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

let clearCache;
if (process.env.NODE_ENV === "development") {
  const { cache } = require;
  clearCache = (except) => {
    for (let key in cache)
      if (!except.includes(key) && key.indexOf("/node_modules/") === -1)
        delete cache[key];
  };
} else {
  clearCache = () => {};
}

app.listen(port, () => {
  console.log(`Logger is listening on port ${port}`);
});
