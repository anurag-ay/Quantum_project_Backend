const express = require("express");
const router = express.Router();
const { User } = require("../models/users");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password is incorrect");

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isValidPassword) return res.status(400).send("Password is incorrect");

  const token = user.generateAuthToken();

  res.send(token);
});

function validate(user) {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(3).max(1024),
  });
  return Schema.validate(user);
}

module.exports = router;
