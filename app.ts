import "dotenv/config";
import express from "express";
import logsRoutes from "./routes/logs";
import ExpressError from "./helpers/ExpressError";

const app = express();
const port = 4050;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/logs", logsRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).send("error", { err });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
