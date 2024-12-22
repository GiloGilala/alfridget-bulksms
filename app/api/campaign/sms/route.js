import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConn";
import { SMS } from "@/lib/africaTalkingConfig";
import Campaign from "@/app/modals/Campaign";
import { auth } from "@/auth";
import { currentUser } from "@/lib/authUser";

// POST /api/campaigns
export const POST = async (req, res) => {
  await dbConnect();

  // const session = await auth(req, res);
  // const user = currentUser();

  // console.log("session :", session);

  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    // Extract req body
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
    } = await req.json();

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
    let TotalSmsCost = 0;

    try {
      console.log("Attempting to send SMS...");
      const smsResponse = await SMS.send({
        to: recipients,
        message,
        from,
      });
      console.log("SMS API Response:", smsResponse.SMSMessageData);

      // Parse the response and set status
      const { SMSMessageData } = smsResponse;
      const { Message, Recipients } = SMSMessageData;

      recipientDetails = Recipients.map((recipient) => ({
        number: recipient.number,
        cost: recipient.cost,
        status: recipient.status,
        statusCode: recipient.statusCode,
        messageId: recipient.messageId,
      }));

      // Log total cost
      const totalCost = Recipients.reduce((acc, recipient) => {
        const cost = parseFloat(recipient.cost.replace("₦ ", ""));
        return acc + cost;
      }, 0);

      const roundedTotalCost = Math.ceil(totalCost * 100) / 100;

      console.log(`Total Cost: ₦ ${roundedTotalCost.toFixed(2)}`);

      // Update SMSAPIResponse with total cost
      TotalSmsCost = `₦ ${roundedTotalCost.toFixed(2)}`;
    } catch (smsError) {
      console.error(
        "SMS Error Response:",
        smsError.response?.data || smsError.message
      );
      smsStatus = "failed";
    }

    // Save campaign to database
    // const newCampaign = new Campaign({
    //   senderId,
    //   title,
    //   from,
    //   type,
    //   unicode,
    //   message,
    //   messageToReply,
    //   credit,
    //   group,
    //   recipients,
    //   scheduleDate,
    //   smsStatus,
    //   recipients: recipientDetails, // Save the details of each recipient
    // });

    // const savedCampaign = await newCampaign.save();

    // Respond with the campaign details and SMS status
    return NextResponse.json(
      {
        message: `Campaign created with SMS status: ${smsStatus}`,
        // campaign: savedCampaign,
        smsSummary: {
          recipients: recipientDetails,
          TotalSmsCost: TotalSmsCost,
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
