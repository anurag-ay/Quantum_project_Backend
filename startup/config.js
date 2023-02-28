const config = require("config");
const { logger, console } = require("./logging");

module.exports = function () {
  if (!config.get("jwt_private_key")) {
    logger.error("Fatal Error jwt_private key is not defined");
    console.error("Fatal Error jwt_private key is not defined");
    process.exit(1);
  }
};
