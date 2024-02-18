const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

require('dotenv').config({ path: '../.env' });

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
 
const User = require("./models/user");
mongoose.connect(`mongodb+srv://michaeldomingz:${process.env.dbPassword}@cluster0.qcagdxr.mongodb.net/`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//endpoint to register a user in the backend
app.post("/register", async (req, res) => {
  console.log("----------------------------------------------------------");
  console.log("----------------------------------------------------------");

  console.log("We are now in post!!!!");

  console.log("----------------------------------------------------------");
  console.log("----------------------------------------------------------");

  try {
    console.log("THIS IS BODY:", req.body)
    const { email, password } = req.body;

    //check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered");
      return res.status(400).json({ message: "Email already registered" });
    }

    //create a new User
    const newUser = new User({
      email,
      password,
    });

    //generate the verification token
    const verificationToken = crypto.randomBytes(20).toString("hex");
    newUser.verificationToken = verificationToken;
    //save the user to the database
    await newUser.save();

    //send the verification email to the registered user

    res.status(202).json({
      message:
        "Registration successful",
        verificationToken: verificationToken,
    });
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({ message: "Registration failed" });
  }
});
app.post("/addName", async (req, res) => {

  try {
    console.log(req.body)
    const { First_Name, Last_Name, verificationToken } = req.body;
    const user = await User.findOne({ 'verificationToken': verificationToken});

    if (!user.password) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = First_Name + " " + Last_Name;

    await user.save();

    res.status(200).json({ message: "Name updated successfully" });
  } catch (error) {
    console.log("Error updating user name", error);
    res.status(500).json({ message: "Failed to update name" });
  }
});

app.post("/addBirthday", async (req, res) => {
  console.log("WE ARE ADDING BIRTHDAY: ")
  try {
    console.log(req.body)
    const { Birthday, verificationToken } = req.body;
    const user = await User.findOne({ 'verificationToken': verificationToken});

    if (!user.password) {
      return res.status(404).json({ message: "User not found" });
    }

    user.birthday = Birthday;

    await user.save();

    res.status(200).json({ message: "Birthday updated successfully" });
  } catch (error) {
    console.log("Error updating user Birthday", error);
    res.status(500).json({ message: "Failed to update name" });
  }
});

