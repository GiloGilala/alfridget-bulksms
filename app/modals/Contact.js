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
    conutry: {
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
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
