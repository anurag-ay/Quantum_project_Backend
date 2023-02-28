const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth");
  if (!token) return res.status(401).send("Access Denied token not found");

  try {
    const decoded = jwt.verify(token, config.get("jwt_private_key"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
};
