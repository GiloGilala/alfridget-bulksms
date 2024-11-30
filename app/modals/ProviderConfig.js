import mongoose from "mongoose";

const providerConfigSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    providerName: {
      type: String,
      required: true,
    },
    hostName: {
      type: String,
      undefined,
      required: true,
    },
    port: {
      type: Number,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
      default: 0,
    },
    providerType: {
      type: String,
      required: true,
    },
    providerConfig: {
      type: String,
      required: true,
    },
    providerUsername: {
      type: String,
      required: true,
    },
    providerPassword: {
      type: String,
      required: true,
    },
    apiKey: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProviderConfig", providerConfigSchema);
