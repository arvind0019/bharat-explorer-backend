import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
  name: String,
  capital: String,
  famousFor: String,
  image: String,
  description: String,
  category: {
    type: String,
    enum: ["Hill Station", "Desert", "Beach", "Cultural", "Historical"],
    default: "Cultural"
  }
});

export default mongoose.model("State", stateSchema);
