import mongoose from "mongoose";

const paymentGatewaySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["stripe", "paypal", "razorpay", "flutterwave"],
    },
    transactionId: { type: String, required: true, index: true },
    status: {
      type: String,
      enum: ["success", "failed", "pending"],
      required: true,
    },
    retries: { type: Number, default: 0 },
    gatewayTransactionId: { type: String, required: true },
    gatewayResponse: { type: Object },
    metadata: { type: Object },
  },
  { timestamps: true }
);

const PaymentGateway =
  mongoose.models?.PaymentGateway ||
  mongoose.model("PaymentGateway", paymentGatewaySchema);
export default PaymentGateway;
