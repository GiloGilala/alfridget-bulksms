import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      trim: true,
    },
    credit: {
      type: Number,
      default: 0,
    },
    ProviderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProviderConfig",
    },
    companyName: {
      type: String,
      trim: true,
    },
    companyCategory: {
      type: String,
      trim: true,
    },
    companyEmail: {
      type: String,
      trim: true,
    },
    companyPhone: {
      type: String,
      trim: true,
    },
    companyWebsite: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    disableDate: {
      type: Date,
    },
    disabledBy: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },
    googleId: {
      type: String,
      default: null,
    },
    passwordResetToken: {
      type: String,
    },
    verificationToken: {
      type: String,
    },
    profileImage: {
      type: String,
      default: null,
    },
    terms: {
      type: Boolean,
      required: false,
    },
    identifier: {
      type: String,
    },
    lastVisit: {
      type: Date,
    },
    visitCount: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
