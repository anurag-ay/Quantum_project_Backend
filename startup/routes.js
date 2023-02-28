const express = require("express");
const error = require("../middleware/error");

// exproting routes
const home = require("../routes/home");
const user = require("../routes/user");
const auth = require("../routes/auth");

module.exports = function (app) {
  // buit in middelware
  app.use(express.json());

  // routing
  app.use("/", home);
  app.use("/api/user", user);
  app.use("/api/auth", auth);
  app.use(error);
};
