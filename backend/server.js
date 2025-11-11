import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));

// Routes
import guideRoutes from "./routes/guideRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

app.use("/api", guideRoutes);
app.use("/api", contactRoutes);

app.get("/", (req, res) => {
  res.send("Bharat Explorer backend is running...");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("✅ Server running on port", process.env.PORT || 5000);
});
