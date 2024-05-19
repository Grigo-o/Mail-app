import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/user.model.js";
import Email from "./models/email.model.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.get("/user/status", authenticateUser, (req, res) => {
  try {
    res.status(200).json({
      email: req.user.email,
      _id: req.user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/user/register", async (req, res) => {
  try {
    console.log("Received registration request:", req.body);

    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    console.log("User registered successfully:", user);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/user/login", async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/email/compose", async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/emails", authenticateUser, async (req, res) => {
  try {
    const { recipients, subject, body } = req.body;
    const recipientList = recipients.split(",").map((email) => email.trim());
    const email = new Email({
      recipients: recipientList,
      subject,
      body,
      sender: req.user.email,
    });
    await email.save();
    res.status(201).json({
      id: email._id,
      recipients: email.recipients,
      subject: email.subject,
      body: email.body,
      createdAt: email.createdAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/emails/c/:emailCategory", authenticateUser, async (req, res) => {
  try {
    const { emailCategory } = req.params;

    const isArchived = emailCategory === "archived";

    const emails = await Email.find({
      archived: isArchived,
      $or: [{ sender: req.user.email }, { recipients: req.user.email }],
    });

    emails.sort((a, b) => b.sentAt - a.sentAt);

    res.status(200).json(emails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/emails/:emailId", async (req, res) => {
  try {
    const { emailId } = req.params;

    const email = await Email.findOne({
      _id: emailId,
      $or: [{ sender: req.user._id }, { recipients: req.user._id }],
    });

    if (!email) {
      return res.status(404).json({ message: "Email not found" });
    }

    res.status(200).json(email);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.patch("/emails/:emailId", async (req, res) => {
  try {
    const { emailId } = req.params;
    const { archived } = req.body;

    const updatedEmail = await Email.findOneAndUpdate(
      {
        _id: emailId,
        $or: [{ sender: req.user._id }, { recipients: req.user._id }],
      },
      { archived },
      { new: true }
    );

    if (!updatedEmail) {
      return res.status(404).json({ message: "Email not found" });
    }

    res.status(200).json({
      id: updatedEmail._id,
      recipients: updatedEmail.recipients,
      subject: updatedEmail.subject,
      body: updatedEmail.body,
      archived: updatedEmail.archived,
      createdAt: updatedEmail.createdAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/user/status", authenticateUser, (req, res) => {
  try {
    res.status(200).json({
      email: req.user.email,
      _id: req.user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

function authenticateUser(req, res, next) {
  const token = req.headers.authorization;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      req.user = decoded;
      next();
    }
  });
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
