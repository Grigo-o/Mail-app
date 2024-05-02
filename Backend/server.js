// Import necessary modules and models
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/user.model.js";
import Email from "./models/email.model.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/mail-app")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// User Registration Route
app.post("/user/register", async (req, res) => {
  try {
    console.log("Received registration request:", req.body); // Log the request body

    // Extract user data from request body
    const { email, password } = req.body;

    // Create a new user instance
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    console.log("User registered successfully:", user); // Log the registered user

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error registering user:", error); // Log any errors that occur
    res.status(500).json({ message: "Internal server error" });
  }
});

// User Login Route
app.post("/user/login", async (req, res) => {
  try {
    // Handle user login logic here
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Compose Email Route
app.post("/email/compose", async (req, res) => {
  try {
    // Handle email composition logic here
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
