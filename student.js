// student.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  // Define other fields as needed
});

module.exports = mongoose.model("Student", studentSchema);
