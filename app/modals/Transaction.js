import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reference: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      required: true,
    },
    payment_method: {
      type: String,
      enum: ["card", "bank", "mobile"],
      required: true,
    },
    opay_transaction_id: {
      type: String,
    },
    callback_data: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

const Transaction =
  mongoose.models?.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction;
