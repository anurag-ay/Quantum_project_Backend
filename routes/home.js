const express = require("express");
const router = express.Router();

// Home route
router.get("/", (req, res) => {
  res.send("Home");
});

module.exports = router;
