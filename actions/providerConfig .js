import dbConnect from "@/lib/dbConn"; // Database connection
import ProviderConfig from "@/app/models/ProviderConfig"; // ProviderConfig model

export const createProviderConfig = async (providerConfigData) => {
  // Validate input data
  if (
    !providerConfigData.userId ||
    !providerConfigData.providerName ||
    !providerConfigData.hostName ||
    !providerConfigData.port ||
    !providerConfigData.credits ||
    !providerConfigData.providerType ||
    !providerConfigData.providerConfig ||
    !providerConfigData.providerUsername ||
    !providerConfigData.providerPassword ||
    !providerConfigData.apiKey
  ) {
    throw new Error("Invalid input data");
  }
  try {
    await dbConnect();

    // Check if a provider config with the same name already exists
    const existingProviderConfig = await ProviderConfig.findOne({
      providerName: providerConfigData.providerName,
    });
    if (existingProviderConfig) {
      throw new Error(
        `A provider config with the name ${providerConfigData.providerName} already exists.`
      );
    }

    // Create and save the new provider config
    const providerConfig = new ProviderConfig(providerConfigData);
    const savedProviderConfig = await providerConfig.save();

    const data = {
      message: "Provider config created successfully",
      providerConfig: savedProviderConfig.toJSON(),
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error creating provider config:", error);
    throw new Error("Could not create provider config");
  }
};

export const updateProviderConfig = async (
  providerConfigId,
  providerConfigData
) => {
  try {
    await dbConnect();

    const updatedProviderConfig = await ProviderConfig.findByIdAndUpdate(
      providerConfigId,
      providerConfigData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProviderConfig) {
      throw new Error(`Provider config with ID ${providerConfigId} not found`);
    }

    const data = {
      message: "Provider config updated successfully",
      providerConfig: updatedProviderConfig.toJSON(),
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error updating provider config:", error);
    throw new Error(error.message || "Could not update provider config");
  }
};

export const fetchProviderConfigs = async () => {
  try {
    await dbConnect();

    const providerConfigs = await ProviderConfig.find().lean();

    if (!providerConfigs.length) {
      throw new Error("No provider configs found");
    }

    const data = {
      message: "Provider configs fetched successfully",
      providerConfigs,
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error fetching provider configs:", error);
    throw new Error(error.message || "Could not fetch provider configs");
  }
};

export const fetchProviderConfigById = async (providerConfigId) => {
  try {
    await dbConnect();

    const providerConfig = await ProviderConfig.findById(
      providerConfigId
    ).lean();

    if (!providerConfig) {
      throw new Error(`Provider config with ID ${providerConfigId} not found`);
    }

    const data = {
      message: "Provider config fetched successfully",
      providerConfig,
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error fetching provider config by ID:", error);
    throw new Error(error.message || "Could not fetch provider config");
  }
};

export const deleteProviderConfig = async (providerConfigId) => {
  try {
    await dbConnect();

    const deletedProviderConfig = await ProviderConfig.findByIdAndDelete(
      providerConfigId
    );

    if (!deletedProviderConfig) {
      throw new Error(`Provider config with ID ${providerConfigId} not found`);
    }

    const data = {
      message: "Provider config deleted successfully",
      providerConfig: deletedProviderConfig,
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error deleting provider config:", error);
    throw new Error(error.message || "Could not delete provider config");
  }
};
