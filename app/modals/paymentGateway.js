import mongoose from "mongoose";

const paymentGatewaySchema = new mongoose.Schema(
  {
    userId: {
      // Added userId for direct reference
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      enum: ["stripe", "paypal", "razorpay", "flutterwave", "paystack", "opay"],
    },
    transactionId: {
      type: String,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["success", "failed", "pending"],
      required: true,
      default: "pending",
    },
    retries: {
      type: Number,
      default: 0,
    },
    gatewayTransactionId: {
      type: String,
      index: true,
    },
    gatewayResponse: {
      type: mongoose.Schema.Types.Mixed,
    }, // Changed from Object to Mixed
    metadata: {
      type: mongoose.Schema.Types.Mixed,
    }, // Changed from Object to Mixed
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      enum: ["USD", "EUR", "GBP", "INR", "NGN"],
      uppercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const PaymentGateway =
  mongoose.models?.PaymentGateway ||
  mongoose.model("PaymentGateway", paymentGatewaySchema);
export default PaymentGateway;
