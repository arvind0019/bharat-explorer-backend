import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    message: {
      type: String,
      required: [true, "Message cannot be empty"],
      minlength: [5, "Message must be at least 5 characters long"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "contacts", // optional, defines MongoDB collection name
  }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
