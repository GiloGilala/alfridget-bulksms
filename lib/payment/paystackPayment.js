// PaystackPayment.js
import { useRouter } from "next/navigation";
import PaystackPop from "@paystack/inline-js";
import { toast } from "react-hot-toast";
import myAxios from "../axiosConfig";
import { createTransaction } from "@/actions/transaction";
import Script from "next/script";
import { useEffect, useState } from "react";

export const usePaystackPayment = (session, formValues) => {
  const router = useRouter();

  const [paystackLoaded, setPaystackLoaded] = useState(false);

  // Load Paystack script
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPaystackLoaded(true);
    }
  }, []);

  const verifyPayment = async (response, amount, email) => {
    try {
      const backendResponse = await myAxios.post("/payments/paystack/verify", {
        reference: response.reference,
        status: response.status,
        transactionId: response.transaction,
        amount,
        email,
      });

      if (backendResponse?.data?.success) {
        toast.success(backendResponse?.data?.message);
        router.push("/billings"); // Add redirect here
      } else {
        toast.error("Payment verification failed.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Payment verification failed.");
    }
  };

  const initializePayment = async () => {
    // Ensure this code runs only in the browser
    if (typeof window === "undefined" || !paystackLoaded) {
      console.warn(
        "Paystack initialization skipped on server side or script not loaded."
      );
      return null;
    }

    const amountInKobo = 800 * 100;
    const reference = `ref-${Date.now()}`;
    const email = session?.user?.email || "example@example.com";

    try {
      // const pendingTransaction = await createTransaction({
      //   userId: session?.user?.id,
      //   type: "deposit",
      //   amount: amountInKobo,
      //   currency: "NGN",
      //   reference,
      //   gateway: "paystack",
      // });

      // if (!pendingTransaction?.successful) {
      //   toast.error("Transaction creation failed");
      //   return null; // Explicitly return null on failure
      // }

      if (!pendingTransaction?.successful) {
        toast.error("Transaction creation failed");
        return null; // Explicitly return null on failure
      }

      return new Promise((resolve, reject) => {
        const paystack = new PaystackPop();
        paystack.newTransaction({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
          email,
          amount: amountInKobo,
          currency: "NGN",
          reference,
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          metadata: {
            customer_name: `${formValues.firstName} ${formValues.lastName}`,
            custom_fields: [
              {
                display_name: "Plan",
                variable_name: "plan",
                value: "Basic SMS Plan - 50,000",
              },
            ],
          },
          onSuccess: (response) => {
            verifyPayment(response, amountInKobo, email);
            resolve(response);
          },
          onClose: () => {
            toast.error("Payment cancelled");
            reject(new Error("Payment cancelled"));
          },
          onError: (error) => {
            console.error("Payment error:", error);
            toast.error("Payment failed");
            reject(error);
          },
        });
      });
    } catch (error) {
      console.error("Payment initialization error:", error);
      toast.error("Payment failed");
      return null;
    }
  };

  return { initializePayment };
};
