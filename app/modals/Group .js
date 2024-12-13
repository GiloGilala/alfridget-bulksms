import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
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
    description: {
      type: String,
      default: null,
    },
    contactIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
      },
    ],
    isActive: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

const Group = mongoose.models?.Group || mongoose.model("Group", groupSchema);

export default Group;
