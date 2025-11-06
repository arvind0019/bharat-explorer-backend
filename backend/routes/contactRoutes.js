import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Contact from "../models/contact.js";

dotenv.config();
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  await new Contact({ name, email, message }).save();
  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "📩 New Contact Message - Bharat Explorer",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  });
  res.json({ message: "Message sent and email delivered!" });
});

export default router;
