import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConn";
import Campaign from "@/models/Campaign";
import Client from "@/models/Client";
import ProviderConfig from "@/models/ProviderConfig";
import { auth } from "next-auth"; // Ensure to import auth

// Function to check if a user has the necessary authorization
const isAuthorized = (user, roles) => {
  return roles.includes(user.role);
};
// POST /api/campaigns
export const POST = async (request) => {
  await dbConnect();

  try {
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
    if (!senderId || !title || !from || !type || !message || !messageToReply) {
      return NextResponse.json(
        { message: "Required fields are missing" },
        { status: 400 }
      );
    }

    // Create a new campaign
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
    });

    const savedCampaign = await newCampaign.save();

    return NextResponse.json(
      { message: "Campaign created successfully", campaign: savedCampaign },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating campaign:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// POST /api/campaigns/send
export const POST2 = async (request) => {
  const session = await auth(request);
  if (!isAuthorized(session.user, ["admin", "superAdmin"])) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  await dbConnect();

  try {
    const {
      senderId,
      title,
      from,
      type,
      message,
      messageToReply,
      referenceId,
      credit,
      group,
      recipientClientId, // Assuming the recipient is a client
      providerId, // Assuming you need this for the provider
    } = await request.json();

    // Find the client and provider to update credits
    const client = await Client.findById(recipientClientId);
    const provider = await ProviderConfig.findById(providerId);

    // Check if the client and provider exist and have enough credits
    if (!client || !provider) {
      return NextResponse.json(
        { message: "Client or Provider not found" },
        { status: 404 }
      );
    }

    if (client.Credits < credit) {
      return NextResponse.json(
        { message: "Insufficient client credits" },
        { status: 400 }
      );
    }

    if (provider.credits < credit) {
      return NextResponse.json(
        { message: "Insufficient provider credits" },
        { status: 400 }
      );
    }

    // Create the campaign
    const newCampaign = new Campaign({
      senderId,
      title,
      from,
      type,
      message,
      messageToReply,
      referenceId,
      credit,
      group,
      recipients: [recipientClientId], // Add recipients accordingly
    });

    await newCampaign.save();

    // Deduct credits from client and provider
    client.Credits -= credit;
    provider.credits -= credit;

    await client.save();
    await provider.save();

    return NextResponse.json(
      { message: "Campaign sent successfully", campaign: newCampaign },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error sending campaign:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// GET /api/campaigns
export const GET = async (request, { params }) => {
  await dbConnect();

  const session = await auth(request);
  if (
    !session ||
    (session.id !== id && !isAuthorized(session.user, ["admin", "superAdmin"]))
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const campaigns = await Campaign.find().populate("senderId groupId");
    return NextResponse.json(campaigns, { status: 200 });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// GET /api/campaigns/:id
export const GET_BY_ID = async (request, { params }) => {
  const { id } = params;

  const session = await auth(request);
  if (
    !session ||
    (session.id !== id && !isAuthorized(session.user, ["admin", "superAdmin"]))
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  await dbConnect();

  try {
    const campaign = await Campaign.findById(id).populate("senderId groupId");
    if (!campaign) {
      return NextResponse.json(
        { message: "Campaign not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(campaign, { status: 200 });
  } catch (error) {
    console.error("Error fetching campaign:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// PUT /api/campaigns/:id
export const PUT = async (request, { params }) => {
  const { id } = params;

  await dbConnect();

  const session = await auth(request);
  if (
    !session ||
    (session.id !== id && !isAuthorized(session.user, ["admin", "superAdmin"]))
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const {
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
      status,
    } = await request.json();

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      id,
      {
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
        status,
      },
      { new: true, runValidators: true }
    );

    if (!updatedCampaign) {
      return NextResponse.json(
        { message: "Campaign not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Campaign updated successfully", campaign: updatedCampaign },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating campaign:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// DELETE /api/campaigns/:id
export const DELETE = async (request, { params }) => {
  const { id } = params;

  await dbConnect();

  const session = await auth(request);
  if (
    !session ||
    (session.id !== id && !isAuthorized(session.user, ["admin", "superAdmin"]))
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const deletedCampaign = await Campaign.findByIdAndDelete(id);
    if (!deletedCampaign) {
      return NextResponse.json(
        { message: "Campaign not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Campaign deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting campaign:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
