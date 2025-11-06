// Bharat Explorer Backend Server
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import Routes
import userRoutes from "./routes/userRoutes.js";
import stateRoutes from "./routes/stateRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

// Config
dotenv.config();
const app = express();

// 🧩 Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

// 🔹 Root Endpoint
app.get("/", (req, res) => {
  res.send("🌏 Bharat Explorer Backend Running...");
});

// Error Handler (optional but clean)
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: "Server Error", message: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
