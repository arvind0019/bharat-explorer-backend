import mongoose from "mongoose";
import dotenv from "dotenv";
import State from "../models/State.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await State.deleteMany();
    await State.insertMany([
      { name: "Uttar Pradesh", capital: "Lucknow", famousFor: "Taj Mahal, Kashi, Culture", category: "Cultural" },
      { name: "Goa", capital: "Panaji", famousFor: "Beaches, Parties", category: "Beach" },
      { name: "Rajasthan", capital: "Jaipur", famousFor: "Deserts, Forts", category: "Desert" },
      { name: "Himachal Pradesh", capital: "Shimla", famousFor: "Hill Stations", category: "Hill Station" }
    ]);
    console.log("✅ Sample states inserted!");
    process.exit();
  })
  .catch(err => console.error(err));
