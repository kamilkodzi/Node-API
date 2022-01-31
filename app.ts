import "dotenv/config";
import express from "express";
import logsRoutes from "./routes/logs";
import ExpressError from "./helpers/ExpressError";
import path from "path";

const app = express();
const port = 4050;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/logs", logsRoutes);

app.get("/admin", (req, res) => {
  throw new ExpressError("You are not autorized", 403);
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.send(statusCode, {
    status: statusCode,
    message: message,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
