import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    email: {
      type: String,
      default: null,
    },
    location: {
      type: String,
    },
    country: {
      // Corrected typo here
      type: String,
    },
    state: {
      type: String,
      default: null,
    },
    notes: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean, // Removed unnecessary 'required: false'
      default: true, // You can also provide a default value (if applicable)
    },
  },
  { timestamps: true }
);

const Contact =
  mongoose.models?.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
