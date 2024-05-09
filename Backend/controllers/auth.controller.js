import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "../asyncHandler";

export const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    password: hashedPassword,
  });
  await user.save();
  res.status(201).json({ message: "User registered successfully" });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    { email: user.email, _id: user._id },
    process.env.JWT_SECRET
  );
  res.status(200).json({ message: "Login successful", token });
});
