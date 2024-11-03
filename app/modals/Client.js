import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ProviderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProviderConfig",
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    companyCategory: {
      type: String,
      required: true,
      trim: true,
    },
    companySubcategory: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    emailAlt: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    phoneAlt: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    county: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    StreetName: {
      type: String,
      trim: true,
    },
    Credits: {
      type: Number,
      required: true,
      default: 0,
    },
    companyBranch: {
      type: String,
      trim: true,
    },
    Status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    services: {
      type: String,
      trim: true,
    },
    comments: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
