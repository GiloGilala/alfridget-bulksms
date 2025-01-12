import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Opay Callback Data:", body);

    // Handle callback data (e.g., update payment status in database)

    return NextResponse.json({ message: "Callback received successfully" });
  } catch (error) {
    console.error("Error handling callback:", error);
    return NextResponse.json(
      { message: "Error processing callback" },
      { status: 500 }
    );
  }
}
