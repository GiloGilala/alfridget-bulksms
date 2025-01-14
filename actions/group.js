"use server";
import dbConnect from "@/lib/dbConn"; // Database connection
import Contact from "@/app/modals/Contact"; // Contact model
import Group from "@/app/modals/Group ";

export const createGroup = async (groupData) => {
  // Validate input data
  if (!groupData.userId || !groupData.name) {
    throw new Error("Invalid input data");
  }
  try {
    await dbConnect();

    // Check if a contact with the same phone number already exists
    const existingGroup = await Group.findOne({ name: groupData.name });
    if (existingGroup) {
      throw new Error(
        `A Group with the name ${groupData.name} already exists.`
      );
    }

    // Create and save the new group
    const group = new Group(groupData);
    const savedGroup = await group.save();

    const data = {
      message: "Group created successfully",
      group: savedGroup.toJSON(),
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error creating group:", error);
    throw new Error(error.message || "Could not create group");
  }
};

export const updateGroup = async (groupId, groupData) => {
  try {
    await dbConnect();

    const updatedGroup = await Group.findByIdAndUpdate(groupId, groupData, {
      new: true,
      runValidators: true,
    });

    if (!updatedGroup) {
      throw new Error(`Group with ID ${groupId} not found`);
    }

    const data = {
      message: "Group updated successfully",
      group: updatedGroup.toJSON(),
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error updating group:", error);
    throw new Error(error.message || "Could not update group");
  }
};

export const fetchGroupsByUser = async (userId) => {
  try {
    await dbConnect();

    const groups = await Group.find({ userId }).populate("contactIds").lean();

    if (!groups.length) {
      throw new Error(`No groups found for user ID ${userId}`);
    }

    const plainGroups = JSON.parse(JSON.stringify(groups));

    return {
      message: "Groups fetched successfully",
      groups: plainGroups,
      successful: true,
    };
  } catch (error) {
    console.error("Error fetching groups by user:", error);
    throw new Error(error.message || "Could not fetch groups");
  }
};

export const fetchGroupById = async (groupId) => {
  try {
    await dbConnect();

    const group = await Group.findById(groupId)
      .populate("contactIds userId")
      .lean();

    if (!group) {
      throw new Error(`Group with ID ${groupId} not found`);
    }

    const data = {
      message: "Group successfully",
      group,
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error fetching group by ID:", error);
    throw new Error(error.message || "Could not fetch group");
  }
};

export const deleteGroup = async (groupId) => {
  try {
    await dbConnect();

    const deletedGroup = await Group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      throw new Error(`Group with ID ${groupId} not found`);
    }

    const data = {
      message: "Group deleted successfully",
      group: deletedGroup,
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error deleting group:", error);
    throw new Error(error.message || "Could not delete group");
  }
};
