const cors = require("cors");
const logger = require("morgan");
const express = require("express");

const env = process.env;

const initLoaders = (app) => {
  app.use(
    cors({
      origin: env.ORIGIN_URI_DEV,
      credentials: true,
    })
  );

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};

module.exports = initLoaders;
