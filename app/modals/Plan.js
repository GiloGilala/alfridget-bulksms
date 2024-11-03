import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    creditLimit: {
      type: Number,
      required: true,
    },
    perDayCreditLimit: {
      type: Number,
      required: true,
    },
    carryForward: {
      type: Boolean,
    },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },

    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Plan", planSchema);
// Email Credit: Unlimited / Unlimited Per Day

// SMS Credit Unlimited / Unlimited Per Day

// Whatsapp Credit Unlimited / Unlimited Per Day

// Duration: 30 Days
