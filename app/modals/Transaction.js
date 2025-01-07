import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    settlementAc: {
      type: String,
      trim: true,
    },

    type: {
      type: String,
      enum: ["Deposit", "Withdrawal", "Payment", "Other"],
      trim: true,
    },
    transactionId: {
      type: String,
      unique: true,
      trim: true,
    },
    time: {
      type: Date,
      trim: true,
    },
    amount: {
      type: Number,
      min: 0,
    },
    isActive: {
      type: Boolean,
      required: false,
    },
  },

  {
    timestamps: true,
  }
);

const Transaction =
  mongoose.models?.Transaction ||
  mongoose.model("Transaction", TransactionSchema);

export default Transaction;
