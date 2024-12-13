import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConn";
import Campaign from "@/models/Campaign";
import { SMS } from "@/lib/africaTalkingConfig";

// POST /api/campaigns
export const POST = async (request) => {
  console.log("MongoDB 1");

  await dbConnect();
  console.log("MongoDB 2");

  try {
    // Authenticate user
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Extract request body
    const {
      senderId,
      title,
      from,
      type,
      unicode,
      message,
      messageToReply,
      credit,
      group,
      recipients,
      scheduleDate,
    } = await request.json();

    // Validate required fields
    if (!senderId || !title || !from || !type || !message || !recipients) {
      return NextResponse.json(
        { message: "Required fields are missing" },
        { status: 400 }
      );
    }

    // Initialize SMS status
    let smsStatus = "failed";
    let recipientDetails = [];

    // Attempt to send SMS
    try {
      const smsResponse = await SMS.send({
        to: recipients,
        message,
        from,
      });

      // Parse SMS response
      const { SMSMessageData } = smsResponse;
      const { Message, Recipients } = SMSMessageData;

      // Update recipient details
      recipientDetails = Recipients.map((recipient) => ({
        number: recipient.number,
        cost: recipient.cost,
        status: recipient.status,
        statusCode: recipient.statusCode,
        messageId: recipient.messageId,
      }));

      // Determine overall SMS status
      if (Recipients.every((r) => r.statusCode === 100)) {
        smsStatus = "success";
      } else if (Recipients.some((r) => r.statusCode === 102)) {
        smsStatus = "pending";
      } else {
        smsStatus = "partial"; // Indicates some successes and some failures
      }
    } catch (smsError) {
      console.error("SMS sending error:", smsError.message || smsError);
      smsStatus = "failed";
    }

    // Save campaign to database
    const newCampaign = new Campaign({
      senderId,
      title,
      from,
      type,
      unicode,
      message,
      messageToReply,
      credit,
      group,
      recipients,
      scheduleDate,
      smsStatus,
      recipients: recipientDetails, // Save the details of each recipient
    });

    const savedCampaign = await newCampaign.save();

    // Respond with the campaign details and SMS status
    return NextResponse.json(
      {
        message: `Campaign created with SMS status: ${smsStatus}`,
        campaign: savedCampaign,
        smsSummary: {
          message: SMSMessageData.Message,
          recipients: recipientDetails,
        },
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating campaign:", error.message || error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
