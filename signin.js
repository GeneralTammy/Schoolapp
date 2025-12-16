const mongoose = require("mongoose");

const signinSchema = new mongoose.Schema({
  email: String,
  password: String,
});

module.exports = mongoose.model("Signin", signinSchema);
