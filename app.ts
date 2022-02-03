import "dotenv/config";
import express from "express";
import logsRoutes from "./routes/logs";
import ExpressError from "./helpers/ExpressError";
import path from "path";
import db from "./config/databaseConfiguration";
import errorMessageCreator from "./middlewares/errorMessageCreator";

const app = express();
const port = 4050;

app.use(express.json());

app.use("/api/logs", logsRoutes);

app.get("/admin", (req, res, next) => {
  next(new ExpressError("You are not autorized", 403));
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
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
  console.log(`Example app listening on port ${port}`);
});
