require("express-async-errors");

const { createLogger, format, transports } = require("winston");
const logger = createLogger({
  transports: [
    new transports.File({
      filename: "vidly_error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "vidly_info.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

const console = createLogger({
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

module.exports.logger = logger;
module.exports.console = console;
