import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// 📨 POST - User sends contact message
router.post("/send", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create and save new contact message
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (err) {
    console.error("Error saving contact message:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// 📬 GET - Admin fetches all contact messages
router.get("/all", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Unable to fetch messages." });
  }
});

export default router;
