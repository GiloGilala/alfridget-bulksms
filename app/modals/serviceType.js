import mongoose from "mongoose";

import mongoose from "mongoose";

const serviceTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      enum: [
        "SMS",
        "Magazine",
        "Newspaper",
        "Email",
        "Social Media",
        "MediaOutlet",
        "Online",
      ],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ServiceType", serviceTypeSchema);
