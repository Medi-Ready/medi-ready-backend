const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const createError = require("http-errors");

const app = express();
const initLoader = require("./loaders");
const connectSequelize = require("./config/db");

initLoader(app);
connectSequelize();

const index = require("./routes/index");
const prescriptionsRouter = require("./routes/prescriptions");

app.use("/", index);
app.use("/prescriptions", prescriptionsRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.error(err);

  err.status
    ? res.status(err.status).json({ result: "fail", message: err.message })
    : res.status(500).json({ result: "fail", message: "Internal server error" });
});

module.exports = app;
