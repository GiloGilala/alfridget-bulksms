// app/api/payment/route.js
import axios from "axios";
import { NextResponse } from "next/server";

const opayApiUrl =
  "https://testapi.opaycheckout.com/api/v1/international/cashier/create";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPAY_AUTHORIZATION_KEY}`,
  MerchantId: process.env.NEXT_PUBLIC_OPAY_MERCHANT_ID,
};

export async function POST(request) {
  try {
    const payload = await request.json();
    const response = await axios.post(opayApiUrl, payload, { headers });

    return NextResponse.json({
      message: "SUCCESSFUL",
      data: response.data.data,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Payment failed" }, { status: 500 });
  }
}
