"use server";
import Campaign from "@/app/modals/Campaign";
import dbConnect from "@/lib/dbConn"; // Database connection

// Create a new campaign
export const createCampaign = async (campaignData) => {
  try {
    await dbConnect();

    const newCampaign = new Campaign(campaignData);
    const savedCampaign = await newCampaign.save();

    const data = {
      message: "Campaign created successfully",
      campaign: savedCampaign,
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error creating campaign:", error);
    throw new Error(error.message || "Could not create campaign");
  }
};

// Fetch all campaigns
export const fetchAllCampaigns = async () => {
  try {
    await dbConnect();

    const campaigns = await Campaign.find({}).populate("senderId groupId");

    if (!campaigns.length) {
      throw new Error("No campaigns found");
    }

    const data = {
      message: "Campaigns fetched successfully",
      campaigns,
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    throw new Error(error.message || "Could not fetch campaigns");
  }
};

export const fetchCampaignById = async (campaignId) => {
  try {
    await dbConnect();

    const campaign = await Campaign.findById(campaignId).populate(
      "senderId groupId"
    );

    if (!campaign) {
      throw new Error("Campaign not found");
    }

    const data = {
      message: "Campaign fetched successfully",
      campaign,
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error fetching campaign by ID:", error);
    throw new Error(error.message || "Could not fetch campaign");
  }
};

export const fetchCampaignsByUser = async (userId) => {
  try {
    await dbConnect();

    const campaigns = await Campaign.find({ userId })
      .populate("groupId")
      .lean();

    if (!campaigns.length) {
      throw new Error(`No campaigns found for user ID ${userId}`);
    }

    // Deeply serialize the data using JSON.parse and JSON.stringify
    const plainCampaigns = JSON.parse(JSON.stringify(campaigns));

    return {
      message: "Campaigns fetched successfully",
      campaigns: plainCampaigns,
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error fetching campaigns by user:", error);
    throw new Error(error.message || "Could not fetch campaigns");
  }
};

export const updateCampaign = async (campaignId, campaignData) => {
  try {
    await dbConnect();

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaignId,
      campaignData,
      { new: true, runValidators: true }
    );

    if (!updatedCampaign) {
      throw new Error("Campaign not found");
    }

    const data = {
      message: "Campaign updated successfully",
      campaign: updatedCampaign,
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error updating campaign:", error);
    throw new Error(error.message || "Could not update campaign");
  }
};

export const deleteCampaign = async (campaignId) => {
  try {
    await dbConnect();

    const deletedCampaign = await Campaign.findByIdAndDelete(campaignId);

    if (!deletedCampaign) {
      throw new Error("Campaign not found");
    }

    const data = {
      message: "Campaign deleted successfully",

      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error deleting campaign:", error);
    throw new Error(error.message || "Could not delete campaign");
  }
};

export const updateCampaignStatus = async (campaignId, status) => {
  try {
    await dbConnect();

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaignId,
      { status },
      { new: true }
    );

    if (!updatedCampaign) {
      throw new Error("Campaign not found");
    }

    const data = {
      message: "Campaign status updated successfully",
      campaign: updatedCampaign,
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error updating campaign status:", error);
    throw new Error(error.message || "Could not update campaign status");
  }
};
