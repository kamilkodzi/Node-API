const express = require("express");
const logsRoutes = require("./routes/logs");

const app = express();
const port = 4050;

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
