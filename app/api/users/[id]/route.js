import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConn";
import User from "@/models/User";
import { auth } from "@/auth"; // Adjust the path as necessary

// Helper function to check if the user has the required role
const isAuthorized = (user, allowedRoles) => {
  return allowedRoles.includes(user.role);
};

// GET user by ID
export const GET = async (request, { params }) => {
  await dbConnect();

  const { id } = params;

  // Retrieve the session to check user role
  const session = await auth();
  if (
    !session ||
    (session.id !== id && !isAuthorized(session.user, ["admin", "superAdmin"]))
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// DELETE user by ID
export const DELETE = async (request, { params }) => {
  await dbConnect();

  const { id } = params;

  // Retrieve the session to check user role
  const session = await auth(request);
  if (
    !session ||
    (session.id !== id && !isAuthorized(session.user, ["admin", "superAdmin"]))
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// PUT update user by ID
export const PUT = async (request, { params }) => {
  await dbConnect();

  const { id } = params;
  const updatedData = await request.json();

  // Retrieve the session to check user role
  const session = await auth(request);
  if (
    !session ||
    (session.id !== id && !isAuthorized(session.user, ["admin", "superAdmin"]))
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    // Optionally, hash the password if it is being updated
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Exclude password from the response
    const { password, ...userData } = updatedUser._doc;

    return NextResponse.json(
      { message: "User updated successfully", user: userData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
