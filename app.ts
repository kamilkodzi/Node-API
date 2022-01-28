import "dotenv/config";
import express from "express";
import logsRoutes from "./routes/logs";

const app = express();
const port = 4050;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/logs", logsRoutes);

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
