import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    fromWalletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
    },
    toWalletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
    },
    paymentMethod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentMethod",
    },
    type: {
      type: String,
      enum: ["deposit", "withdrawal", "transfer"],
      required: true,
    },
    amount: { type: Number, required: true, min: 0 },
    accountBalanceBefore: { type: Number, required: true, default: 0 },
    accountBalanceAfter: { type: Number, required: true, default: 0 },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "INR", "NGN"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "cancelled"],
      required: true,
      default: "pending",
    },
    paymentMethodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentMethod",
    },
    description: { type: String, trim: true },
    reference: { type: String, required: true, unique: true },
    failureReason: { type: String },
    metadata: { type: Object },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Transaction =
  mongoose.models?.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction;
