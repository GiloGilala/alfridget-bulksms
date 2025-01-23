import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["CARD", "BANK_TRANSFER", "PAYPAL"],
      required: true,
    },
    // Card details
    cardNumber: {
      type: String,
      sparse: true,
      select: false, // Added security for sensitive data
    },
    cardHolderName: { type: String, sparse: true },
    expirationMonth: { type: Number, min: 1, max: 12, sparse: true },
    expirationYear: { type: Number, sparse: true },
    // Bank details
    bankName: { type: String, sparse: true },
    accountNumber: {
      type: String,
      sparse: true,
      select: false, // Added security for sensitive data
    },
    routingNumber: {
      type: String,
      sparse: true,
      select: false, // Added security for sensitive data
    },
    isDefault: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "expired", "removed"],
      default: "active",
    },
    gateway: {
      type: String,
      enum: ["paystack", "opay", "stripe", "paypal"],
      required: true,
    },
    gatewayToken: {
      type: String,
      select: false, // Added security for sensitive data
    },
  },
  {
    timestamps: true,
  }
);

const PaymentMethod =
  mongoose.models?.PaymentMethod ||
  mongoose.model("PaymentMethod", paymentMethodSchema);

export default PaymentMethod;

// import crypto from "crypto";

// const encrypt = (data) => {
//   const cipher = crypto.createCipheriv(
//     "aes-256-cbc",
//     process.env.ENCRYPTION_KEY,
//     process.env.IV
//   );
//   let encrypted = cipher.update(data, "utf-8", "hex");
//   encrypted += cipher.final("hex");
//   return encrypted;
// };

// const decrypt = (data) => {
//   const decipher = crypto.createDecipheriv(
//     "aes-256-cbc",
//     process.env.ENCRYPTION_KEY,
//     process.env.IV
//   );
//   let decrypted = decipher.update(data, "hex", "utf-8");
//   decrypted += decipher.final("utf-8");
//   return decrypted;
// };
