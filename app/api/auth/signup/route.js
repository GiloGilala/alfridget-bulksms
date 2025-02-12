import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConn";
import User from "@/app/modals/User";

export const POST = async (req) => {

  const { firstName, lastName, email, phone, password, username, terms } =
    await req.json();

  // Manual validation
  if (!firstName || !lastName || !email || !phone || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 }
    );
  }

  // Phone validation (international format)
  // const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  const phoneRegex = /^[0-9]{11}$/;
  if (!phoneRegex.test(phone)) {
    return NextResponse.json(
      { message: "Invalid phone number format" },
      { status: 400 }
    );
  }

  // Password length validation
  if (password.length < 8) {
    return NextResponse.json(
      { message: "Password must be at least 8 characters long" },
      { status: 400 }
    );
  }

  // Username length validation
  if (username.length < 3) {
    return NextResponse.json(
      { message: "Username must be at least 3 characters long" },
      { status: 400 }
    );
  }
  if (!terms) {
    return NextResponse.json(
      { message: "terms must be at aspected" },
      { status: 400 }
    );
  }

  // Check if email or phone already exists
  try {
    await dbConnect();

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
      username,
      password: hashedPassword,
      isActive: true,
      terms,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered Successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
};
