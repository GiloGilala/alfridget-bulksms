import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    balance: { type: Number, default: 0, min: 0 },
    currency: {
      type: String,
      required: true,
      enum: ["USD", "EUR", "GBP", "INR", "NGN"],
      uppercase: true,
    },
    status: {
      type: String,
      enum: ["active", "frozen", "closed", "suspended"],
      default: "active",
    },
    lastTransactionAt: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Wallet =
  mongoose.models?.Wallet || mongoose.model("Wallet", walletSchema);
export default Wallet;
