import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConn";
import { auth } from "@/auth";
import { SMS } from "@/lib/africaTalkingConfig";
import Campaign from "@/app/modals/Campaign";

// POST /api/campaigns
export const POST = async (request) => {
  await dbConnect();

  try {
    // Authenticate the user (optional)
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
      referenceId,
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

    // Attempt to send SMS
    let smsStatus;
    try {
      const smsResponse = await SMS.send({
        to: recipients,
        message,
        from,
      });

      // Log SMS Response (Optional)
      console.log("SMS Response:", smsResponse);

      // Check SMS sending status
      smsStatus = smsResponse.status || "pending"; // Use "pending" as a fallback if no status is returned
      if (smsStatus !== "success" && smsStatus !== "pending") {
        return NextResponse.json(
          { message: "Failed to send SMS" },
          { status: 400 }
        );
      }
    } catch (smsError) {
      console.error("SMS sending error:", smsError.message || smsError);
      return NextResponse.json(
        { message: "Failed to send SMS due to an error" },
        { status: 500 }
      );
    }

    // Save campaign only if SMS sending is successful or pending
    const newCampaign = new Campaign({
      senderId,
      title,
      from,
      type,
      unicode,
      message,
      messageToReply,
      referenceId,
      credit,
      group,
      recipients,
      scheduleDate,
      smsStatus, // Save the status of the SMS
    });

    const savedCampaign = await newCampaign.save();

    return NextResponse.json(
      { message: "Campaign created successfully", campaign: savedCampaign },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating campaign:", error.message || error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
