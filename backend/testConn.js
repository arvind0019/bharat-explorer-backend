import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("❌ MONGO_URI not set in .env");
  process.exit(1);
}

async function test() {
  try {
    // keep options minimal — mongoose v7+ doesn't need those flags but it's fine
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected (test script)");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ MongoDB connect error (test):", err.message);
    process.exit(1);
  }
}
test();
