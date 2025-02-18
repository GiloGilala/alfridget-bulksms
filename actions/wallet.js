"use server";
import Campaign from "@/app/modals/Campaign";
import Transaction from "@/app/modals/Transaction";
import Wallet from "@/app/modals/Wallet";
import dbConnect from "@/lib/dbConn"; // Database connection

// Create a new wallet
export const createWallet = async (walletData) => {
  try {
    await dbConnect();

    const wallet = new Wallet(walletData);
    await wallet.save();

    const plainWallet = JSON.parse(JSON.stringify(wallet));

    const data = {
      message: "Wallet created successfully",
      wallet: plainWallet,
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error creating wallet:", error);
    throw new Error(error.message || "Could not create wallet");
  }
};

// Get a wallet by userId
export const getWalletByUserId = async (userId) => {
  try {
    await dbConnect();

    const wallet = await Wallet.findOne({ userId }).lean();

    if (!wallet) {
      const data = {
        message: `No wallet found for user ID ${userId}`,
        wallet: null,
        successful: false,
      };
      return data;
    }

    const plainWallet = JSON.parse(JSON.stringify(wallet));

    const data = {
      message: "Wallet fetched successfully",
      wallet: plainWallet,
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error fetching wallet:", error);
    throw new Error(error.message || "Could not fetch wallet");
  }
};

export const getWalletAndAllTransactions = async (userId) => {
  try {
    await dbConnect();

    // Fetch the wallet
    const wallet = await Wallet.findOne({ userId }).lean();
    if (!wallet) {
      return {
        message: `No wallet found for user ID ${userId}`,
        wallet: null,
        transactions: [],
        successful: false,
      };
    }

    // Fetch only required transaction fields
    const transactions = await Transaction.find({ walletId: wallet._id })
      .sort({ createdAt: -1 })
      .limit(20)
      .select("_id reference userId status createdAt amount currency") // Only fetch required fields
      .populate("userId", "firstName lastName"); // Populate userId field with only the name

    // Convert to plain objects
    const plainWallet = JSON.parse(JSON.stringify(wallet));
    const plainTransactions = JSON.parse(JSON.stringify(transactions));

    const data = {
      message: "Wallet and transactions fetched successfully",
      wallet: plainWallet,
      transactions: plainTransactions,
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error fetching wallet and transactions:", error);
    throw new Error(error.message || "Could not fetch wallet and transactions");
  }
};


export const getWalletTransDashboard = async (userId) => {
  try {
    await dbConnect();

    // Fetch the wallet
    const wallet = await Wallet.findOne({ userId }).lean();

    if (!wallet) {
      const data = {
        message: `No wallet found for user ID ${userId}`,
        wallet: null,
        transactions: [],
        successful: false,
      };
      return data;
    }

    // Fetch all transactions associated with the wallet
    const transactions = await Transaction.find({ walletId: wallet._id })
    .sort({ createdAt: -1 })
    .limit(10)
    .select("_id reference amount currency status createdAt") // Only fetch required fields
    .lean();

      const campaigns = await Campaign.find({ senderId: userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("_id title message createdAt status") // Only fetch required fields
      .lean();

    // Convert to plain objects (optional, since .lean() already does this)
    const plainWallet = JSON.parse(JSON.stringify(wallet));
    const plainCampaigns = JSON.parse(JSON.stringify(campaigns));
    const plainTransactions = JSON.parse(JSON.stringify(transactions));

    const data = {
      message: "Wallet and transactions fetched successfully",
      wallet: plainWallet,
      sms: plainCampaigns,
      transactions: plainTransactions,
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error fetching wallet and transactions:", error);
    throw new Error(error.message || "Could not fetch wallet and transactions");
  }
};

// Update a wallet by userId
export const updateWalletByUserId = async (userId, updateData) => {
  try {
    await dbConnect();

    const wallet = await Wallet.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    if (!wallet) {
      const data = {
        message: `No wallet found for user ID ${userId}`,
        wallet: null,
        successful: false,
      };
      return data;
    }

    const plainWallet = JSON.parse(JSON.stringify(wallet));

    const data = {
      message: "Wallet updated successfully",
      wallet: plainWallet,
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error updating wallet:", error);
    throw new Error(error.message || "Could not update wallet");
  }
};

// Delete a wallet by userId
export const deleteWalletByUserId = async (userId) => {
  try {
    await dbConnect();

    const wallet = await Wallet.findOneAndDelete({ userId }).lean();

    if (!wallet) {
      const data = {
        message: `No wallet found for user ID ${userId}`,
        wallet: null,
        successful: false,
      };
      return data;
    }

    const plainWallet = JSON.parse(JSON.stringify(wallet));

    const data = {
      message: "Wallet deleted successfully",
      wallet: plainWallet,
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error deleting wallet:", error);
    throw new Error(error.message || "Could not delete wallet");
  }
};
