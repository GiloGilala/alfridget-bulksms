import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConn";
import { SMS } from "@/lib/africaTalkingConfig";
import Campaign from "@/app/modals/Campaign";
import { auth } from "@/auth";
import Contact from "@/app/modals/Contact";
import User from "@/app/modals/User";

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
      groupId,
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
    let totalSmsCost = 0;
    let roundedTotalCost = 0;
    let contacts = [];
    let balance = 0;

    try {
      if (groupId) {
        contacts = await Contact.find({ groupId: groupId });
        contacts.map((contact) => contact.phone);
      }

      const combineContacts = [...contacts, ...recipients];
      // console.log("combineContacts:", combineContacts);
      // console.log("Attempting to send SMS...");
      const smsResponse = await SMS.send({
        to: combineContacts,
        message,
        from: "ATTALKNG",
      });
      console.log("SMS API Response:", smsResponse.SMSMessageData);

      // Parse the response and set status
      const { SMSMessageData } = smsResponse;
      const { Message, Recipients } = SMSMessageData;

      // const Recipients = [
      //   {
      //     cost: "NGN 3.6000",
      //     messageId: "ATXid_87c54f3ad4627654ca3b5054b5c7543d",
      //     messageParts: 1,
      //     number: "+2348062846800",
      //     status: "Success",
      //     statusCode: 101,
      //   },
      //   {
      //     cost: "NGN 3.6000",
      //     messageId: "ATXid_1fa2485447e787836401e52126ee31e8",
      //     messageParts: 1,
      //     number: "+2348035538208",
      //     status: "Success",
      //     statusCode: 101,
      //   },
      //   {
      //     cost: "NGN 3.1000",
      //     messageId: "ATXid_f246341d10b7be1e52e780bf68ade239",
      //     messageParts: 1,
      //     number: "+2348056026428",
      //     status: "Success",
      //     statusCode: 101,
      //   },
      // ];
      recipientDetails = Recipients.map((recipient) => ({
        number: recipient.number,
        cost: recipient.cost,
        status: recipient.status,
        statusCode: recipient.statusCode,
        messageId: recipient.messageId,
      }));

      console.log(`recipientDetails: `, recipientDetails);

      // Log total cost
      const totalCost = Recipients.reduce((acc, recipient) => {
        const cost = parseFloat(recipient.cost.replace("NGN ", ""));
        return acc + cost;
      }, 0);

      roundedTotalCost = Math.ceil(totalCost * 100) / 100;

      // console.log(`Total Cost: ₦ ${roundedTotalCost.toFixed(2)}`);

      // Update SMSAPIResponse with total cost
      // totalSmsCost = `₦ ${roundedTotalCost.toFixed(2)}`;
      totalSmsCost = roundedTotalCost.toFixed(2);
    } catch (smsError) {
      console.error(
        "SMS Error Response:",
        smsError.response?.data || smsError.message
      );
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
      credit: totalSmsCost,
      // groupId: groupId ? groupId : null,
      scheduleDate,
      status: "sent",
      recipients: recipientDetails, // Save the details of each recipient
    });

    if (senderId) {
      balance = await User.findByIdAndUpdate(senderId, {
        $inc: { credit: -totalSmsCost },
      });
    }

    const savedCampaign = await newCampaign.save();

    // Respond with the campaign details and SMS status
    return NextResponse.json(
      {
        message: Message,
        campaign: savedCampaign,
        balance: balance.credit.toFixed(),
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating campaign:", error.message || error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
