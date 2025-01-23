// app/api/payment/route.js
import { NextResponse } from "next/server";
import Transaction from "@/app/modals/Transaction";
import axios from "axios";
import dbConnect from "@/lib/dbConn";

const PAYSTACK_API_URL = process.env.PAYSTACK_API_URL;
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
console.log("PAYSTACK_API_URL:", PAYSTACK_API_URL);
console.log("PAYSTACK_SECRET_KEY:", PAYSTACK_SECRET_KEY);

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
};

export async function POST(request) {
  try {
    const payload = await request.json();

    // Validate payload
    if (!payload.amount || !payload.email || !payload.reference) {
      return NextResponse.json(
        { error: "Missing required fields in payload" },
        { status: 400 }
      );
    }

    // Prepare Paystack payload
    const paystackPayload = {
      email: payload.email, // Customer's email
      amount: payload.amount * 100, // Amount in kobo (e.g., 10000 = ₦100)
      reference: payload.reference, // Unique transaction reference
      currency: payload.currency || "NGN", // Default to NGN if not provided
      metadata: payload.userInfo || {}, // Additional metadata (optional)
    };

    // Call Paystack API to initialize payment
    const response = await axios.post(PAYSTACK_API_URL, paystackPayload, {
      headers,
    });

    console.log("Paystack Response:", response.data);

    await dbConnect();

    // Save the transaction as "pending"
    const transaction = new Transaction({
      userId: payload.userInfo?.userId,
      type: "deposit",
      amount: payload.amount,
      currency: payload.currency || "NGN",
      status: "pending",
      reference: payload.reference,
      metadata: payload,
    });

    await transaction.save();

    return NextResponse.json({
      message: "SUCCESSFUL",
      data: response.data.data,
    });
  } catch (error) {
    console.error(
      "Error creating payment:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      {
        error: "Payment failed",
        details: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
