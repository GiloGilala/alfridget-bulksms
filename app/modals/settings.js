import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    messageSetting: {
      messageLength: { type: String, required: true },
      messageLength: { type: String, required: true },
    },
    smsSetting: {
      messageLength: { type: String, required: true },
      messageLength: { type: String, required: true },
    },
    emailSetting: {
      messageLength: { type: String, required: true },
      messageLength: { type: String, required: true },
    },
    whatsappSetting: {
      messageLength: { type: String, required: true },
      messageLength: { type: String, required: true },
    },
    notifications: { type: String, required: true },

    campaignTypes: [
      {
        name: { type: String, required: true },
        description: { type: String },
        messageLength: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Setting", settingSchema);
