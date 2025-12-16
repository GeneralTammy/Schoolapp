const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

const StudentModel = require("./student");
const student = require("./student");
const SignupModel = require("./signup");
const signup = require("./signup");
const SigninModel = require("./signin");
const signin = require("./signin");
const UserModel = require("./User");
const user = require("./User");

mongoose
  .connect("mongodb://localhost:27017/schooldb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.post("/student", async (req, res) => {
  try {
    const newStudent = new StudentModel(req.body);
    await newStudent.save();
    res.status(201).send(newStudent);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all students
app.get("/student", async (req, res) => {
  const students = await StudentModel.find(); // This should return all documents
  res.send(students);
});

app.put("/student/:id", async (req, res) => {
  const updatedStudent = await StudentModel.findByIdAndUpdate(
    req.params.id, // This reads the ID from the URL parameter
    req.body, // This uses the new data from the JSON body
    { new: true } // This ensures the response sends back the UPDATED document
  );
  res.send(updatedStudent);
});

app.delete("/student/:id", async (req, res) => {
  await student.findByIdAndDelete(req.params.id);
  res.send({ message: "student deleted sucessfully!" });
});

app.post("/signup", async (req, res) => {
  try {
    const newSignup = new SignupModel(req.body);
    await newSignup.save();
    res.status(201).send(newSignup);
  } catch (err) {
    res.status(400).send(err);
  }
});
app.get("/signup", async (req, res) => {
  res.send("sign up page");
});

app.post("/signin", async (req, res) => {
  try {
    const newSignin = new SigninModel(req.body);
    await newSignin.save();
    res.status(201).send(newSignin);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/signin", async (req, res) => {
  res.send("signin successfully!");
});

app.get("/user", async (req, res) => {
  res.send("signin data received!");
});

app.get("/user", async (req, res) => {
  res.send("sign up data received !");
});
app.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
