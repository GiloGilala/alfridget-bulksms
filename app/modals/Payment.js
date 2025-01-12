import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    transactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    payment_date: {
      type: Date,
      required: true,
    },
    payment_status: {
      type: String,
      enum: ["success", "failed"],
      required: true,
    },
    payment_method: {
      type: String,
      enum: ["card", "bank", "mobile"],
      required: true,
    },
    opay_payment_id: {
      type: String,
    },
  },
  { timestamps: true }
);

const Payment =
  mongoose.models?.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;
