import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      // Added userId for direct user reference
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    fromWalletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      sparse: true,
    },
    toWalletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      sparse: true,
    },
    paymentMethod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentMethod",
    },
    type: {
      type: String,
      enum: ["deposit", "credit", "withdrawal", "transfer"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    accountBalanceBefore: {
      type: Number,
      default: 0,
    },
    accountBalanceAfter: {
      type: Number,
      default: 0,
    },
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
    description: {
      type: String,
      trim: true,
    },
    reference: {
      type: String,
      required: true,
      unique: true,
    },
    failureReason: {
      type: String,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    gateway: {
      type: String,
      enum: ["paystack", "opay", "stripe", "paypal"],
      required: true,
    },
    gatewayTransactionId: {
      type: String,
    },
    paymentGatewayResponse: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

const Transaction =
  mongoose.models?.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction;
