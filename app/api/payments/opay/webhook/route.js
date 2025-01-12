// src/app/api/payment/webhook/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";

// Verify OPay signature
function verifySignature(payload, signature, secretKey) {
  const hmac = crypto.createHmac("sha512", secretKey);
  const computedSignature = hmac.update(JSON.stringify(payload)).digest("hex");
  return computedSignature === signature;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const signature = request.headers.get("x-opay-signature");
    console.log("Webhook payload:", body);
    // Verify the webhook signature
    if (!verifySignature(body, signature, process.env.OPAY_SECRET_KEY)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Handle different webhook events
    switch (body.event) {
      case "payment.success":
        // Handle successful payment
        await handleSuccessfulPayment(body.data);
        break;

      case "payment.failed":
        // Handle failed payment
        await handleFailedPayment(body.data);
        break;

      case "payment.pending":
        // Handle pending payment
        await handlePendingPayment(body.data);
        break;

      default:
        console.log("Unhandled webhook event:", body.event);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

// Example handler functions
async function handleSuccessfulPayment(data) {
  // Update your database
  // Fulfill the order
  // Send confirmation email
  console.log("Successful payment:", data);
}

async function handleFailedPayment(data) {
  // Update payment status in database
  // Notify customer
  console.log("Failed payment:", data);
}

async function handlePendingPayment(data) {
  // Update payment status in database
  console.log("Pending payment:", data);
}
