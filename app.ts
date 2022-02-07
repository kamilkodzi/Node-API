import "dotenv/config";
import express from "express";
import logsRoutes from "./routes/logs";
import ExpressError from "./helpers/ExpressError";
import errorMessageCreator from "./middlewares/errorMessageCreator";

const app = express();
const port = 4050;

app.use(express.json());

app.use("/logs", logsRoutes);

app.get("/admin", (req, res, next) => {
  next(new ExpressError("You are not autorized", 403));
});

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
