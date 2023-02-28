const { logger, console } = require("../startup/logging");

module.exports = function (err, req, res, next) {
  logger.error(err.message), console.info(err.message);
  res.status(500).send("Something went wrong");
  next();
};
