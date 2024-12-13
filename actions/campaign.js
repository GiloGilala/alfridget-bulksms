import Campaign from "@/app/modals/Campaign";
import dbConnect from "@/lib/dbConn"; // Database connection

// Create a new campaign
export const createCampaign = async (campaignData) => {
  try {
    await dbConnect();
    const newCampaign = new Campaign(campaignData);
    const savedCampaign = await newCampaign.save();
    return savedCampaign;
  } catch (error) {
    console.error("Error creating campaign:", error);
    throw new Error("Could not create campaign");
  }
};

// Fetch all campaigns
export const fetchAllCampaigns = async () => {
  try {
    await dbConnect();
    const campaigns = await Campaign.find({}).populate("senderId groupId");
    return campaigns;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    throw new Error("Could not fetch campaigns");
  }
};

// Fetch a campaign by ID
export const fetchCampaignById = async (campaignId) => {
  try {
    await dbConnect();
    const campaign = await Campaign.findById(campaignId).populate(
      "senderId groupId"
    );
    if (!campaign) {
      throw new Error("Campaign not found");
    }
    return campaign;
  } catch (error) {
    console.error("Error fetching campaign by ID:", error);
    throw new Error("Could not fetch campaign");
  }
};

// Update a campaign
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
    return updatedCampaign;
  } catch (error) {
    console.error("Error updating campaign:", error);
    throw new Error("Could not update campaign");
  }
};

// Delete a campaign
export const deleteCampaign = async (campaignId) => {
  try {
    await dbConnect();
    const deletedCampaign = await Campaign.findByIdAndDelete(campaignId);
    if (!deletedCampaign) {
      throw new Error("Campaign not found");
    }
    return deletedCampaign;
  } catch (error) {
    console.error("Error deleting campaign:", error);
    throw new Error("Could not delete campaign");
  }
};

// Update campaign status
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
    return updatedCampaign;
  } catch (error) {
    console.error("Error updating campaign status:", error);
    throw new Error("Could not update status");
  }
};
