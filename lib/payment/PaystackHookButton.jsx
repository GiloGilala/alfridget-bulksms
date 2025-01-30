"use client";

import React, { useCallback, useState } from "react";
import { PaystackConsumer } from "react-paystack";
import myAxios from "@/lib/axiosConfig";
import { cancelledTransaction, createTransaction } from "@/actions/transaction";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const PaystackPaymentButton = ({
  buttonText = "Pay Now",
  isLoading = false,
  configPaystackPayment,
  userId,
  isModalOpen,
}) => {
  const { email, amount, publicKey, reference } = configPaystackPayment || {};
  const router = useRouter();
  const amountInKobo = amount * 100;

  const createPendingTransaction = useCallback(async () => {
    try {
      const pendingTransaction = await createTransaction({
        userId,
        type: "deposit",
        amount,
        currency: "NGN",
        reference,
        gateway: "paystack",
      });

      // console.log("Transaction response:", pendingTransaction);

      if (!pendingTransaction?.successful) {
        throw new Error("Transaction creation failed");
      }

      return pendingTransaction.transaction;
    } catch (error) {
      console.error("Transaction creation error:", error);
      toast.error(error.message || "Failed to create transaction");
      return null;
    }
  }, [userId, amount, reference]);

  const handlePaystackSuccess = async (response) => {
    console.log("Payment successful!", response);
    toast.success("Payment successful!");

    try {
      const backendResponse = await myAxios.post("/payments/paystack/verify", {
        reference: response.reference,
        status: response.status,
        transactionId: response.transaction,
        amount: amountInKobo,
        email: email,
      });

      if (backendResponse?.data?.success) {
        toast.success(backendResponse.data.message);
        router.push("/billings");
      } else {
        throw new Error(
          backendResponse?.data?.message || "Payment verification failed"
        );
      }
    } catch (error) {
      console.error("Error during payment verification:", error);
      toast.error(
        error.message || "An error occurred during payment verification."
      );
    }
  };

  const handlePaystackClose = async () => {
    try {
      const cancelled = await cancelledTransaction(userId, reference);
      if (cancelled.success) {
        console.log("Payment cancelled successfully");
        toast.error("Payment process cancelled");
      } else {
        throw new Error(cancelled.message || "Failed to cancel transaction");
      }
    } catch (error) {
      console.error("Error cancelling transaction:", error);
      toast.error(error.message || "Failed to cancel transaction");
    }
  };

  const handleClick = async (initializePayment) => {
    if (!email || !amount || !publicKey || !userId || !reference) {
      console.error("Missing required fields:", {
        email,
        amount,
        publicKey,
        userId,
        reference,
      });
      toast.error("Payment configuration is incomplete.");
      return;
    }

    try {
      console.log("Starting transaction creation...");
      const transaction = await createPendingTransaction();

      if (transaction) {
        isModalOpen();
        initializePayment();
      } else {
        throw new Error("Failed to create transaction");
      }
    } catch (error) {
      console.error("Payment initialization error:", error);
      toast.error(error.message || "Failed to initialize payment");
    }
  };

  const config = { ...configPaystackPayment, amount: amountInKobo };
  console.log("config :", config);

  return (
    <PaystackConsumer
      {...config}
      onSuccess={handlePaystackSuccess}
      onClose={handlePaystackClose}
    >
      {({ initializePayment }) => (
        <button
          onClick={() => handleClick(initializePayment)}
          disabled={isLoading}
          className="py-3 px-3 text-sm font-semibold bg-primary text-white rounded-xl hover:bg-primary/90 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Processing..." : buttonText}
        </button>
      )}
    </PaystackConsumer>
  );
};

export default PaystackPaymentButton;
