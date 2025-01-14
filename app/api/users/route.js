import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConn";
import { auth } from "@/auth";
import User from "@/app/modals/User";

// Function to check if a user has the necessary authorization
const isAuthorized = (user, roles) => {
  return roles.includes(user.role);
};

export const GET = async (req) => {
  const session = await auth();
  console.log("session:", session);

  if (!isAuthorized(session.user, ["admin", "superAdmin"])) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const users = await User.find();
    console.log("users:", users);

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
