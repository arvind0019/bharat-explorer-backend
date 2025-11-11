import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// ✅ Enable CORS for your Netlify site
app.use(cors({
  origin: ["https://bharat-explorer.netlify.app"],  // your frontend domain
  methods: ["GET", "POST"],
}));

app.use(express.json());

// ---- Your routes ----
import guideRoutes from "./routes/guideRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

app.use("/api", guideRoutes);
app.use("/api", contactRoutes);

app.get("/", (req, res) => {
  res.send("Bharat Explorer backend is running...");
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`✅ Server running on port ${process.env.PORT || 5000}`)
);
