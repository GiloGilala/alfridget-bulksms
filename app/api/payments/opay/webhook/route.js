// src/app/api/payment/webhook/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";
import Wallet from "@/app/modals/Wallet";
import Transaction from "@/app/modals/Transaction";
import dbConnect from "@/lib/dbConn";

function verifySignature(payload, signature, secretKey) {
  try {
    const hmac = crypto.createHmac("sha512", secretKey);
    const computedSignature = hmac
      .update(JSON.stringify(payload)) // Payload must match the original format
      .digest("hex");

    console.log("Computed signature:", computedSignature);
    console.log("Provided signature:", signature);

    if (computedSignature !== signature) {
      throw new Error("Invalid signature");
    }

    return true;
  } catch (error) {
    console.error("Error verifying signature:", error);
    return false;
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    // const payload = {
    //   payload: {
    //     country: "NG",
    //     amount: "400",
    //     instrumentType: "BankCard",
    //     fee: "0.00",
    //     channel: "Web",
    //     errorCode: "00046",
    //     feeCurrency: "",
    //     displayedFailure: "The order was closed due to timeout",
    //     transactionId: "250116145661302864662",
    //     errorMsg: "The order was closed due to timeout",
    //     token: "250116145661302864662",
    //     reference: "ref-1737069306130",
    //     updated_at: "2025-01-17T04:15:20Z",
    //     currency: "NGN",
    //     refunded: false,
    //     status: "CLOSE",
    //     timestamp: "2025-01-20T04:15:20Z",
    //   },
    //   sha512:
    //     "25e5bb7714c5d82bf0c499915b4e806d6ec1ff8df888debde926dfff603539343b4d059de71d316439ecb0d20295f98741788cf70517c1885fcdac365cc19667",
    //   type: "transaction-status",
    // };

    // Validate payload structure
    if (!payload.payload || !payload.sha512 || !payload.type) {
      console.error("Invalid payload format:", payload);
      return NextResponse.json(
        { error: "Invalid payload format" },
        { status: 400 }
      );
    }

    const signature = payload.sha512; // Use the signature from the payload
    // Log the payload being used for signature verification
    console.log(
      "Payload for signature verification:",
      JSON.stringify(payload.payload)
    );

    // Verify the webhook signature
    if (
      !verifySignature(
        payload.payload, // Use only the nested payload object
        signature,
        process.env.NEXT_PUBLIC_OPAY_AUTHORIZATION_KEY
      )
    ) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    console.log("Signature verified successfully");
    console.log("After verifySignature:", payload);
    await dbConnect();

    // Find the transaction by reference
    const transaction = await Transaction.findOne({
      reference: payload.payload.reference,
    });

    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    // Update transaction fields
    transaction.amount = parseFloat(payload.payload.amount); // Convert amount to a number
    transaction.currency = payload.payload.currency;
    transaction.description = `Wallet top-up via OPay (${payload.payload.instrumentType})`;
    transaction.metadata = payload; // Store the entire payload for auditing

    // Find or create a wallet for the user using upsert
    const wallet = await Wallet.findOneAndUpdate(
      { userId: transaction.userId }, // Query
      {
        $setOnInsert: {
          balance: 0,
          currency: payload.payload.currency || "NGN",
        },
      }, // Default values if inserting
      { upsert: true, new: true, setDefaultsOnInsert: true } // Options
    );

    // Check for currency mismatch
    if (payload.payload.currency !== wallet.currency) {
      console.error("Currency mismatch:", {
        transactionCurrency: payload.payload.currency,
        walletCurrency: wallet.currency,
      });
      return NextResponse.json({ error: "Currency mismatch" }, { status: 400 });
    }

    // Handle transaction status
    if (payload.payload.status === "SUCCESS") {
      // Update wallet balance if payment is successful
      transaction.accountBalanceBefore = wallet.balance; // Set balance before the transaction
      wallet.balance += transaction.amount; // Update wallet balance
      transaction.accountBalanceAfter = wallet.balance; // Set balance after the transaction
      await wallet.save();

      transaction.status = "completed";
    } else if (payload.payload.status === "CLOSE") {
      // Handle timeout or closed transactions
      transaction.status = "failed";
      transaction.failureReason =
        payload.payload.errorMsg || "Payment timed out";
    } else if (payload.payload.status === "FAILED") {
      // Handle failed transactions
      transaction.status = "failed";
      transaction.failureReason = payload.payload.errorMsg || "Payment failed";
    } else {
      // Handle other statuses (e.g., pending)
      transaction.status = "pending";
    }

    // Save the updated transaction
    await transaction.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

// Webhook payload: {
//   payload: {
//     country: 'NG',
//     amount: '400',
//     instrumentType: 'BankCard',
//     fee: '0.00',
//     channel: 'Web',
//     errorCode: '00046',
//     feeCurrency: '',
//     displayedFailure: 'The order was closed due to timeout',
//     transactionId: '250116145661302864662',
//     errorMsg: 'The order was closed due to timeout',
//     token: '250116145661302864662',
//     reference: 'ref-1737069306130',
//     updated_at: '2025-01-17T04:15:20Z',
//     currency: 'NGN',
//     refunded: false,
//     status: 'CLOSE',
//     timestamp: '2025-01-17T04:15:20Z'
//   },
//   sha512: '25e5bb7714c5d82bf0c499915b4e806d6ec1ff8df888debde926dfff603539343b4d059de71d316439ecb0d20295f98741788cf70517c1885fcdac365cc19667',
//   type: 'transaction-status'
// }
