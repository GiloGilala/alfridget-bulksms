import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConn";
import User from "@/app/modals/User";

// POST /api/auth/login
export const POST = async (req, res) => {
  await dbConnect();

  try {
    const { email, password, phone } = await req.json();

    let identifier = email || phone;
    // console.log("identifier :", identifier);
    // console.log("email :", email);
    // console.log("password :", password);

    // Validate required fields
    if (!identifier || !password) {
      return NextResponse.json(
        { message: "Identifier and password are required" },
        { status: 400 }
      );
    }

    // Find the user by email or phone
    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 401 }
      );
    }

    // If login is successful, you can return user information (excluding the password)
    const userData = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      credit: user.credit,
      phone: user.phone,
      role: user.role,
      profileImage: user.profileImage,
      terms: user.terms,
      isActive: user.isActive,
    };

    // Optionally, you could generate a JWT here for session management

    return NextResponse.json(
      { message: "Login successful", success: true, user: userData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
