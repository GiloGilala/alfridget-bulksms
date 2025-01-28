"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { usePaystackPayment } from "react-paystack";

const PaystackHookButton = ({
  onSuccess,
  onClose,
  buttonText = "Pay Now",
  isLoading = false,
  configPaystackPayment,
}) => {
  const { email, amount, publicKey } = configPaystackPayment || {};

  const initializePayment = usePaystackPayment(configPaystackPayment);

  const handleClick = () => {
    if (!email || !amount || !publicKey) {
      console.error("Missing required fields: email, amount, or publicKey");
      return;
    }

    initializePayment(onSuccess, onClose);
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      className="py-3 text-sm font-semibold z-100"
      disabled={isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? "Processing..." : buttonText}
    </Button>
  );
};

export default PaystackHookButton;
