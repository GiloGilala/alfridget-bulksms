import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConn";
import { SMS } from "@/lib/africaTalkingConfig";
import Campaign from "@/app/modals/Campaign";
import { auth } from "@/auth";
import Contact from "@/app/modals/Contact";
import User from "@/app/modals/User";
import axios from "axios";
import Wallet from "@/app/modals/Wallet";

// POST /api/campaigns
export const POST = async (req, res) => {
  // Authenticate user
  const session = await auth(req, res);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Extract request body
    const {
      userId,
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
    if (!userId || !title || !from || !type || !message || !recipients) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 }
      );
    }

    // Initialize variables
    let smsStatus = "failed";
    let recipientDetails = [];
    let totalSmsCost = 0;
    let roundedTotalCost = 0;
    let contacts = [];
    let balance = 0;
    let smsMessage = "";
    let savedCampaign = {};
    await dbConnect();

    // Check if user has sufficient balance
    let wallet = await Wallet.findOne({ userId });
    if (wallet.balance < totalSmsCost) {
      return NextResponse.json(
        { error: "Insufficient balance" },
        { status: 400 }
      );
    }

    // Fetch contacts if groupId is provided
    if (groupId) {
      contacts = await Contact.find({ groupId: groupId });
      if (!contacts) {
        console.log("No contacts found for group ID:", groupId);
      } else {
        console.log("contacts g:", contacts);
        contacts = contacts.map((contact) => contact.phone);
      }
    }

    // Combine and deduplicate recipients

    const combineContacts = [...new Set([...contacts, ...recipients])];
    console.log("ringo start:");
    console.log("combineContacts:", combineContacts);

    // const smsDataRingo = {
    //   recipients: combineContacts,
    //   message: "Hello, this is a test SMS with Ringo.",
    //   sender_id: "ALTBANK",
    // };

    // const headers = {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Jpbmdvc21zLmFwcHJvb3QubmcvYXBpL2xvZ2luIiwiaWF0IjoxNzM4MDgyMTU3LCJleHAiOjUxNDM1MTAyOTU3LCJuYmYiOjE3MzgwODIxNTcsImp0aSI6IjBWY3NFZ1NZSXhjV1lEMFMiLCJzdWIiOiIyIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.Ivr8t839DQeyTtv_J948JaksNNFy-4FYRQRu5TJpTEI`,
    // };

    // const res = await axios.post(
    //   "https://ringosms.approot.ng/api/sms/send",
    //   smsDataRingo,
    //   { headers }
    // );
    // console.log("ringo end:");
    // console.log("Ringo API Response:", res.data);

    // Send SMS using Africa's Talking
    try {
      const smsResponse = await SMS.send({
        to: combineContacts,
        message,
        from,
        // from: "ATTALKNG"
      });
      console.log("SMS API Response:", smsResponse.SMSMessageData);

      const { SMSMessageData } = smsResponse;
      const { Message, Recipients } = SMSMessageData;

     // Check if there are no recipients
  if (!Recipients || Recipients.length < 1) {
    console.log("No recipients found:", Message);
    return NextResponse.json(
      { error: Message || "No recipients found." }, 
      { status: 400 } 
    );
  }

      smsMessage = Message;

      // Process recipient details
      recipientDetails = Recipients.map((recipient) => ({
        number: recipient.number,
        cost: recipient.cost,
        status: recipient.status,
        statusCode: recipient.statusCode,
        messageId: recipient.messageId,
      }));

      // Calculate total cost
      const totalCost = Recipients.reduce((acc, recipient) => {
        const cost = parseFloat(recipient?.cost?.replace("NGN ", ""));
        return acc + cost;
      }, 0);

      roundedTotalCost = Math.ceil(totalCost * 100) / 100;
      totalSmsCost = roundedTotalCost.toFixed(2);
      smsStatus = "sent";
    } catch (smsError) {
      console.error("SMS Error:", smsError.response?.data || smsError.message);
      smsStatus = "failed";
    }

    // Save campaign to database

    if (totalSmsCost > 2 && userId) {
      const newCampaign = new Campaign({
        senderId: userId,
        title,
        from,
        type,
        unicode,
        message,
        messageToReply,
        credit: totalSmsCost,
        scheduleDate,
        status: smsStatus,
        recipients: recipientDetails,
      });
      // Deduct cost from user's balance
      savedCampaign = await newCampaign.save();
      const userBalance = await Wallet.findOneAndUpdate(
        { userId },
        { $inc: { balance: -totalSmsCost } },
        { new: true }
      );
    }

    // Respond with success
    return NextResponse.json(
      {
        smsMessage: smsMessage,
        message: "Campaign created successfully",
        campaign: savedCampaign,
        balance: balance.toFixed(),
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating campaign:", error.message || error);
    return NextResponse.json(
      { error: "Server error", success: false },
      { status: 500 }
    );
  }
};
