const mongoose = require("mongoose");
const { console, logger } = require("./logging");

module.exports = function () {
  //connecting to the database
  mongoose.connect("mongodb://localhost:27017/quantum").then(() => {
    console.info("connected to the mongodb");
    logger.info("Connected to mongodb");
  });
};
