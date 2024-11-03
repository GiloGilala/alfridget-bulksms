// GET /api/users
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConn";
import User from "@/models/User";
import { auth } from "next-auth"; // Ensure to import auth

// GET all users
export const GET = async (request) => {
  await dbConnect();

  try {
    const users = await User.find();

    const userData = users.map((user) => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      Credits: user.Credits,
      verified: user.verified,
    }));

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
