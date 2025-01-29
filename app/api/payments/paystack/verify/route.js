// src/app/api/payment/verify/route.js
import { NextResponse } from "next/server";
import Wallet from "@/app/modals/Wallet";
import Transaction from "@/app/modals/Transaction";
import dbConnect from "@/lib/dbConn";
import axios from "axios";
import PaymentGateway from "@/app/modals/paymentGateway";
import PaymentMethod from "@/app/modals/paymentMethod";
import User from "@/app/modals/User";

const PAYSTACK_API_URL = "https://api.paystack.co";
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
};

export async function POST(request) {
  try {
    const { reference } = await request.json();
    console.log(" Response :", reference);

    if (!reference) {
      return NextResponse.json(
        { error: "Reference is required" },
        { status: 400 }
      );
    }

    // Verify with Paystack
    const verificationRes = await axios.get(
      `${PAYSTACK_API_URL}/transaction/verify/${reference}`,
      { headers }
    );
    console.log(" verification Response ok:");

    const paystackData = verificationRes.data.data;
    const amountInNaira = paystackData.amount / 100; // Conversion here

    console.log("Payment Response:", verificationRes.data);
    await dbConnect();
    // Find existing transaction
    const transaction = await Transaction.findOne({ reference });
    if (
      transaction.amount !== paystackData.amount &&
      transaction.currency !== paystackData.currency &&
      transaction.status !== "pending" &&
      transaction.paymentGateway !== "paystack"
    ) {
      throw new Error("Transaction not found");
    }
    // if (!transaction) {
    //   throw new Error("Transaction not found");
    // }

    // Find or create wallet
    const wallet = await Wallet.findOneAndUpdate(
      { userId: transaction.userId },
      {
        $setOnInsert: {
          currency: transaction.currency,
          status: "active",
        },
      },
      { upsert: true, new: true }
    );

    // Update payment gateway record
    await PaymentGateway.findOneAndUpdate(
      { gatewayTransactionId: reference },
      {
        status: paystackData.status === "success" ? "success" : "failed",
        gatewayResponse: paystackData,
        $inc: { retries: 1 },
      }
    );

    if (paystackData.status === "success") {
      // Save card if it's a card payment
      if (paystackData.channel === "card") {
        const auth = paystackData.authorization;
        await PaymentMethod.create({
          userId: transaction.userId,
          type: "CARD",
          cardNumber: `****${auth.last4}`,
          cardHolderName: `${paystackData.customer.first_name} ${paystackData.customer.last_name}`,
          expirationMonth: auth.exp_month,
          expirationYear: auth.exp_year,
          gateway: "paystack",
          gatewayToken: auth.authorization_code,
          status: "active",
        });
      }

      // Update wallet
      const updatedWallet = await Wallet.findOneAndUpdate(
        { _id: wallet._id },
        {
          $inc: {
            balance: amountInNaira,
            transactionCount: 1,
          },
          $set: {
            lastTransactionAt: new Date(),
            lastTransactionAmount: transaction.amount,
          },
        },
        { new: true }
      );

      // Update user's credit with the current wallet balance
      await User.findOneAndUpdate(
        { _id: transaction.userId },
        {
          $set: { credit: updatedWallet.balance }, // Update with current wallet balance
        },
        { new: true }
      );

      // Update transaction
      transaction.status = "completed";
      transaction.accountBalanceBefore = wallet.balance;
      transaction.accountBalanceAfter = updatedWallet.balance;
      transaction.paymentGatewayResponse = paystackData;
      transaction.gatewayTransactionId = paystackData.id;
      await transaction.save();

      return NextResponse.json({
        success: true,
        data: { transaction, wallet: updatedWallet },
        message: "Transaction successful",
      });
    } else {
      // Handle failed payment
      transaction.status = "failed";
      transaction.failureReason = paystackData.gateway_response;
      await transaction.save();

      return NextResponse.json({
        success: false,
        error: "Payment failed",
        data: { transaction },
      });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: "Payment verification failed", details: error.message },
      { status: 500 }
    );
  }
}

// const Response = {
//   status: true,
//   message: "Verification successful",
//   data: {
//     id: 4606994198,
//     domain: "test",
//     status: "success",
//     reference: "ref-1737459555198",
//     receipt_number: null,
//     amount: 40000,
//     message: null,
//     gateway_response: "Successful",
//     paid_at: "2025-01-21T11:39:46.000Z",
//     created_at: "2025-01-21T11:39:23.000Z",
//     channel: "card",
//     currency: "NGN",
//     ip_address: "102.89.32.79",
//     metadata: {
//       custom_fields: [Array],
//       userId: "674cca1a21c76560ff003637",
//       referrer: "http://localhost:3000/billings/checkout",
//     },
//     log: {
//       start_time: 1737459564,
//       time_spent: 23,
//       attempts: 1,
//       errors: 0,
//       success: true,
//       mobile: false,
//       input: [],
//       history: [Array],
//     },
//     fees: 600,
//     fees_split: null,
//     authorization: {
//       authorization_code: "AUTH_dwm22l5itt",
//       bin: "408408",
//       last4: "4081",
//       exp_month: "12",
//       exp_year: "2030",
//       channel: "card",
//       card_type: "visa ",
//       bank: "TEST BANK",
//       country_code: "NG",
//       brand: "visa",
//       reusable: true,
//       signature: "SIG_siLnJNN1jtjfE3KxReA3",
//       account_name: null,
//       receiver_bank_account_number: null,
//       receiver_bank: null,
//     },
//     customer: {
//       id: 230977408,
//       first_name: "John",
//       last_name: "Doe",
//       email: "gilogilala@gmail.com",
//       customer_code: "CUS_eofrmag5xa5jwe8",
//       phone: "09030904384",
//       metadata: {},
//       risk_action: "default",
//       international_format_phone: null,
//     },
//     plan: null,
//     split: {},
//     order_id: null,
//     paidAt: "2025-01-21T11:39:46.000Z",
//     createdAt: "2025-01-21T11:39:23.000Z",
//     requested_amount: 40000,
//     pos_transaction_data: null,
//     source: null,
//     fees_breakdown: null,
//     connect: null,
//     transaction_date: "2025-01-21T11:39:23.000Z",
//     plan_object: {},
//     subaccount: {},
//   },
// };
