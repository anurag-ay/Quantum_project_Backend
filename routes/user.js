const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/users");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  let user = await User.findById(req.user._id).select("-password -_id -__v");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send("User already exist");

  const { name, DateOfBirth, email, password } = req.body;
  user = new User({
    name,
    DateOfBirth,
    email,
    password,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  user = _.pick(user, ["name", "email"]);
  res.header("x-auth", token).send(user);
});

module.exports = router;
