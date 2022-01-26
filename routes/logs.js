const { Router } = require("express");
const db = require("../config/database");
const router = Router();

router.get("/", (req, res) => {
  res.sendStatus(200);
});

router.post("/new", (req, res) => {
  const {
    id,
    created,
    uploaded,
    source,
    system,
    customer,
    user,
    shortDescription,
    iserror,
    errorCode,
    errorDescription,
    longDescription,
  } = req.body;
  res.sendStatus(200);
  console.log(id);
});

module.exports = router;
