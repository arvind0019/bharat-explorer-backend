import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("❌ MONGO_URI missing. Add to .env");
  process.exit(1);
}

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    // print full error for debugging
    console.error(err);
    process.exit(1); // stop server if DB is required
  }
}
connectDB();
