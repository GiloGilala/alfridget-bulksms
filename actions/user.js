import dbConnect from "@/lib/dbConn"; // Database connection file
import User from "@/app/modals/User"; // Mongoose User model

// Fetch all users
export const fetchAllUsers = async () => {
  try {
    await dbConnect(); // Ensure the database is connected
    const users = await User.find({});
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Could not fetch users");
  }
};

// Fetch a single user by ID
export const fetchUserById = async (userId) => {
  try {
    await dbConnect();
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Could not fetch user");
  }
};

// Create a new user
export const createUser = async (userData) => {
  try {
    await dbConnect();
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Could not create user");
  }
};

// Update user details
export const updateUser = async (userId, userData) => {
  try {
    await dbConnect();
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Could not update user");
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  try {
    await dbConnect();
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new Error("User not found");
    }
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Could not delete user");
  }
};

// Search users by criteria (e.g., username or email)
export const searchUsers = async (query) => {
  try {
    await dbConnect();
    const users = await User.find({
      $or: [
        { username: new RegExp(query, "i") },
        { email: new RegExp(query, "i") },
      ],
    });
    return users;
  } catch (error) {
    console.error("Error searching users:", error);
    throw new Error("Could not search users");
  }
};

// Verify user account
export const verifyUser = async (userId) => {
  try {
    await dbConnect();
    const verifiedUser = await User.findByIdAndUpdate(
      userId,
      { verified: true },
      { new: true }
    );
    if (!verifiedUser) {
      throw new Error("User not found");
    }
    return verifiedUser;
  } catch (error) {
    console.error("Error verifying user:", error);
    throw new Error("Could not verify user");
  }
};

// Disable a user account
export const disableUser = async (userId) => {
  try {
    await dbConnect();
    const disabledUser = await User.findByIdAndUpdate(
      userId,
      { isDisabled: true },
      { new: true }
    );
    if (!disabledUser) {
      throw new Error("User not found");
    }
    return disabledUser;
  } catch (error) {
    console.error("Error disabling user:", error);
    throw new Error("Could not disable user");
  }
};

// Enable a user account
export const enableUser = async (userId) => {
  try {
    await dbConnect();
    const enabledUser = await User.findByIdAndUpdate(
      userId,
      { isDisabled: false },
      { new: true }
    );
    if (!enabledUser) {
      throw new Error("User not found");
    }
    return enabledUser;
  } catch (error) {
    console.error("Error enabling user:", error);
    throw new Error("Could not enable user");
  }
};

// Update user password
export const updateUserPassword = async (userId, newPassword) => {
  try {
    await dbConnect();
    const hashedPassword = await bcrypt.hash(newPassword, 12); // Hash the password
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  } catch (error) {
    console.error("Error updating password:", error);
    throw new Error("Could not update password");
  }
};
