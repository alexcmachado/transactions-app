const express = require("express");
const transactionRouter = express.Router();

transactionRouter.get("/", async (req, res) => {
  res.send("oier");
});

module.exports = transactionRouter;
