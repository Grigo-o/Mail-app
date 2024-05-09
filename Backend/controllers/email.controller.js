import Email from "../models/email.model";
import asyncHandler from "../asyncHandler"; 

export const compose = asyncHandler(async (req, res) => {
  const { sender, recipients, subject, body } = req.body;
  const email = new Email({
    sender,
    recipients,
    subject,
    body,
  });
  await email.save();
  res.status(201).json({ message: "Email composed successfully" });
});
