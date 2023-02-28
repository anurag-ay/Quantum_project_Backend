const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  DateOfBirth: {
    type: Date,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, "anurag");
  return token;
};

const User = mongoose.model("users", userSchema);

function validateUser(user) {
  const Schema = Joi.object({
    name: Joi.string().required().min(3).max(225),
    DateOfBirth: Joi.date(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(3).max(1024),
  });
  return Schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
