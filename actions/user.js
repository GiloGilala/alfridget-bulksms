"use server";

import dbConnect from "@/lib/dbConn"; // Database connection file
import User from "@/app/modals/User"; // Mongoose User model
import bcrypt from "bcryptjs";
import { sendEmail } from "@/lib/nodemailer";

export const createUser = async (userData) => {
  // Validate input data
  if (!userData.username || !userData.email || !userData.password) {
    throw new Error("Invalid input data");
  }

  try {
    await dbConnect();

    // Check if a user with the same username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username: userData.username }, { email: userData.email }],
    });
    if (existingUser) {
      throw new Error(
        `A user with the username ${userData.username} or email ${userData.email} already exists.`
      );
    }

    // Create and save the new user
    const user = new User(userData);
    const savedUser = await user.save();

    const data = {
      message: "User created successfully",
      user: savedUser.toJSON(),
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(error.message || "Could not create user");
  }
};

export const fetchUsers = async () => {
  try {
    await dbConnect();

    // Find the user by ID
    const users = await User.find()
      .select("-password -__v") // Exclude password and version fields
      .sort({ createdAt: -1 })
      .lean(); // Populate groups field

    if (!users.length) {
      throw new Error(`Users not found`);
    }

    const data = {
      message: "User fetched successfully",
      users: users,
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error fetching users", error);
    throw new Error(error.message || "Could not fetch users");
  }
};

export const fetchUserById = async (userId) => {
  try {
    await dbConnect();

    // Find the user by ID
    const user = await User.findById(userId).select("-password -__v").lean(); // Exclude password and version fields

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const data = {
      message: "User fetched successfully",
      user: user,
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error(error.message || "Could not fetch user");
  }
};

export const updateUserCredit = async (userData) => {
  // Validate input data
  if (!userData.userId || !userData.credit) {
    throw new Error("Invalid input data");
  }

  try {
    await dbConnect();
    // Update user credit
    const updatedUser = await User.findByIdAndUpdate(
      userData.userId,
      {
        $inc: { credit: userData.credit },
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      throw new Error(`User with ID ${userData.userId} not found`);
    }

    const data = {
      message: "User credit updated successfully",
      user: updatedUser.toJSON(),
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error updating user credit:", error);
    throw new Error(error.message || "Could not update user credit");
  }
};

export const updateCreditByAdmin = async (adminData) => {
  // Validate input data
  if (
    !adminData.adminId ||
    !adminData.adminPassword ||
    !adminData.userId ||
    !adminData.credit
  ) {
    throw new Error("Invalid input data");
  }

  try {
    await dbConnect();

    const existingAdmin = await User.findOne({ _id: adminData.adminId });
    const isPasswordValid = await bcrypt.compare(
      adminData.adminPassword,
      existingAdmin.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid admin password");
    }

    // Update user credit
    const updatedUser = await User.findByIdAndUpdate(
      adminData.userId,
      {
        $inc: { credit: adminData.credit },
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      throw new Error(`User with ID ${adminData.userId} not found`);
    }

    const emailSubject = "Regel Credit Update Notification";
    const emailText = `
    <div style="background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #333; font-weight: bold;">Credit Update Notification</h2>
      <p style="color: #666; font-size: 16px;">Your Regel credit has been updated from ${updatedUser.credit} to ${updatedUser.credit}.</p>
      <p style="color: #666; font-size: 16px;">Thank you for using our service.</p>
    </div>
  `;
    try {
      await sendEmail({
        to: adminData.email, // Retrieve the user's email from the database
        // to: updatedUser.email, // Retrieve the user's email from the database
        subject: emailSubject,
        html: emailText,
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
    }

    const data = {
      message: "User credit updated successfully by admin",
      user: updatedUser.toObject(),
      // user: updatedUser.toJSON(),
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error updating user credit by admin:", error);
    throw new Error(error.message || "Could not update user credit by admin");
  }
};

export const updateUser = async (userId, userData) => {
  // Validate input data
  if (!userId || !userData) {
    throw new Error("Invalid input data");
  }

  try {
    await dbConnect();

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Update the user data
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });

    const data = {
      message: "User updated successfully",
      user: updatedUser.toJSON(),
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error(error.message || "Could not update user");
  }
};

export const deleteUser = async (userId) => {
  // Validate input data
  if (!userId) {
    throw new Error("Invalid input data");
  }

  try {
    await dbConnect();

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Delete the user
    await user.remove();

    const data = {
      message: "User deleted successfully",
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error(error.message || "Could not delete user");
  }
};

export const searchUsers = async (query) => {
  // Validate input data
  if (!query) {
    throw new Error("Invalid input data");
  }

  try {
    await dbConnect();

    // Search for users matching the query
    const users = await User.find({
      $or: [
        { username: new RegExp(query, "i") },
        { email: new RegExp(query, "i") },
      ],
    });

    const data = {
      message: "Users searched successfully",
      users: users.map((user) => user.toJSON()),
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error searching users:", error);
    throw new Error(error.message || "Could not search users");
  }
};

export const verifyUser = async (userId) => {
  // Validate input data
  if (!userId) {
    throw new Error("Invalid input data");
  }

  try {
    await dbConnect();

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Verify the user
    user.verified = true;
    await user.save();

    const data = {
      message: "User verified successfully",
      user: user.toJSON(),
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error verifying user:", error);
    throw new Error(error.message || "Could not verify user");
  }
};

export const disableUser = async (userId) => {
  // Validate input data
  if (!userId) {
    throw new Error("Invalid input data");
  }

  try {
    await dbConnect();

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Disable the user
    user.isDisabled = true;
    await user.save();

    const data = {
      message: "User disabled successfully",
      user: user.toJSON(),
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error disabling user:", error);
    throw new Error(error.message || "Could not disable user");
  }
};

export const enableUser = async (userId) => {
  // Validate input data
  if (!userId) {
    throw new Error("Invalid input data");
  }

  try {
    await dbConnect();

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Enable the user
    user.isDisabled = false;
    await user.save();

    const data = {
      message: "User enabled successfully",
      user: user.toJSON(),
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error enabling user:", error);
    throw new Error(error.message || "Could not enable user");
  }
};

export const updateUserPassword = async (userId, newPassword) => {
  // Validate input data
  if (!userId || !newPassword) {
    throw new Error("Invalid input data");
  }

  try {
    await dbConnect();

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Update the user's password
    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    const data = {
      message: "User password updated successfully",
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error updating user password:", error);
    throw new Error(error.message || "Could not update user password");
  }
};

export const sendPasswordResetEmail = async (email) => {
  // Validate input data
  if (!email) {
    throw new Error("Invalid input data");
  }

  try {
    await dbConnect();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    // Generate a password reset token
    const token = await user.generatePasswordResetToken();

    // Send the password reset email
    await sendEmail({
      to: email,
      subject: "Password Reset Request",
      text: `To reset your password, click on this link: ${token}`,
    });

    const data = {
      message: "Password reset email sent successfully",
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error(error.message || "Could not send password reset email");
  }
};

export const resetPassword = async (token, newPassword) => {
  // Validate input data
  if (!token || !newPassword) {
    throw new Error("Invalid input data");
  }

  try {
    await dbConnect();

    // Find the user by password reset token
    const user = await User.findOne({ passwordResetToken: token });
    if (!user) {
      throw new Error(`User with password reset token ${token} not found`);
    }

    // Update the user's password
    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    const data = {
      message: "Password reset successfully",
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw new Error(error.message || "Could not reset password");
  }
};
