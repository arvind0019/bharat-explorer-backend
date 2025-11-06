import express from "express";
import State from "../models/State.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Get all states
router.get("/", async (req, res) => res.json(await State.find()));

// Recommendations
router.get("/recommendations", async (req, res) => {
  const { category } = req.query;
  let query = category ? { category } : {};
  const states = await State.find(query);
  res.json(states.sort(() => 0.5 - Math.random()).slice(0, 3));
});

// Admin CRUD
router.post("/", protect, adminOnly, async (req, res) => {
  const newState = new State(req.body);
  await newState.save();
  res.status(201).json(newState);
});

router.put("/:id", protect, adminOnly, async (req, res) =>
  res.json(await State.findByIdAndUpdate(req.params.id, req.body, { new: true }))
);

router.delete("/:id", protect, adminOnly, async (req, res) => {
  await State.findByIdAndDelete(req.params.id);
  res.json({ message: "State deleted" });
});

export default router;
