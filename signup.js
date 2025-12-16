const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  dob: Date,
  password: String,
});

module.exports = mongoose.model("Signup", signupSchema);
