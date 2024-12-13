import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messageSetting: {
      maxLength: { type: String, required: true }, // Adjusted field name
      minLength: { type: String, required: true },
    },
    smsSetting: {
      maxLength: { type: String, required: true }, // Adjusted field name
      minLength: { type: String, required: true },
    },
    emailSetting: {
      maxLength: { type: String, required: true }, // Adjusted field name
      minLength: { type: String, required: true },
    },
    whatsappSetting: {
      maxLength: { type: String, required: true }, // Adjusted field name
      minLength: { type: String, required: true },
    },
    notifications: {
      type: String,
      required: true,
    },
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

const Setting =
  mongoose.models?.Setting || mongoose.model("Setting", settingSchema);

export default Setting;
