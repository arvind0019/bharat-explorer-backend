import express from "express";
import User from "../models/User.js";
import State from "../models/State.js";
import Contact from "../models/Contact.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/stats", protect, adminOnly, async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalStates = await State.countDocuments();
  const totalMessages = await Contact.countDocuments();
  res.json({ totalUsers, totalStates, totalMessages });
});

export default router;
