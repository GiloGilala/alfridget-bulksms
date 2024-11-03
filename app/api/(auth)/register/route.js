import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConn";
import User from "@/models/User";

// User registration route
export const POST = async (request) => {
  await dbConnect();

  const { firstName, lastName, email, phone, password } = await request.json();

  // Check if email or phone already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { phone }],
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "Email or phone number already in use" },
      { status: 400 }
    );
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create the new user
  const newUser = new User({
    firstName,
    lastName,
    email,
    phone,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error registering user" },
      { status: 500 }
    );
  }
};
