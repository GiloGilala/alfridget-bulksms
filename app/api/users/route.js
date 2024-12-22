import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConn";
import { auth } from "@/auth";
import User from "@/app/modals/User";

export const GET = async (req, res) => {
  await dbConnect();

  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
