import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true, //  SMS, Bulk SMS,  Long SMS,  bulk Email, Whatsapp, MediaOutlet,
    },
    unicode: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      required: true,
    },

    messageToReply: {
      type: String,
      required: true,
    },
    referenceId: {
      type: String,
      unique: true,
    },
    credit: {
      type: Number,
      required: true,
      default: 0,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    recipients: [],
    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
    scheduleDate: {
      type: Date,
      required: false, // Optional field for scheduling campaigns
    },

    sentAt: {
      type: Date,
    },
    errorMessage: {
      type: String,
      default: "",
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Campaign", campaignSchema);
