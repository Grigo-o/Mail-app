import Email from "../models/email.model";

export const compose = async (req, res) => {
  try {
    const { sender, recipients, subject, body } = req.body;
    const email = new Email({
      sender,
      recipients,
      subject,
      body,
    });
    await email.save();
    res.status(201).json({ message: "Email composed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
