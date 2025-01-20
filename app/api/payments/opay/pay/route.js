// app/api/payment/route.js
import { NextResponse } from "next/server";
import Transaction from "@/app/modals/Transaction";
import axios from "axios";
import dbConnect from "@/lib/dbConn";

const OPAY_API_URL = `${process.env.NEXT_PUBLIC_OPAY_API_URL}/api/v1/international/cashier/create`;
const OPAY_AUTH_KEY = process.env.NEXT_PUBLIC_OPAY_AUTHORIZATION_KEY;
const OPAY_MERCHANT_ID = process.env.NEXT_PUBLIC_OPAY_MERCHANT_ID;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${OPAY_AUTH_KEY}`,
  MerchantId: OPAY_MERCHANT_ID,
};

export async function POST(request) {
  try {
    const payload = await request.json();
    // console.log("OPay payload:", OPAY_API_URL);

    // Validate payload
    if (!payload.amount || !payload.amount.currency || !payload.reference) {
      return NextResponse.json(
        { error: "Missing required fields in payload" },
        { status: 400 }
      );
    }

    // Call OPay API to create payment
    const response = await axios.post(OPAY_API_URL, payload, { headers });
    console.log("OPay Response:", payload);
    await dbConnect();

    // Save the transaction as "pending"
    const transaction = new Transaction({
      userId: payload.userInfo?.userId,
      type: "deposit",
      amount: payload.amount.total,
      currency: payload.amount.currency,
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
