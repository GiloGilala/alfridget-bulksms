{
  /* <div className="grid grid-cols-12 gap-7">
  <StatisticsCard1 className="col-span-12 lg:col-span-3" />
  <StatisticsCard2 className="col-span-12 lg:col-span-3" />
  <StatisticsCard3 className="col-span-12 lg:col-span-3" />
  <Sales className="col-span-12 lg:col-span-8" />
  <CustomerReview className="col-span-12 lg:col-span-4" />
  <CardCTA className="col-span-12 lg:col-span-8" />
  <CardProgress className="col-span-12 lg:col-span-4" />
  <ReturningRate className="col-span-12 lg:col-span-4" />
  <CustomerTransactions className="col-span-12 lg:col-span-8" />
</div>; */
}

("use client");

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import myAxios from "@/lib/axiosConfig";

const Checkout = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isPaystackReady, setIsPaystackReady] = useState(false);

  useEffect(() => {
    // Dynamically load Paystack script
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => setIsPaystackReady(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePaystackPayment = () => {
    if (!isPaystackReady || typeof window.PaystackPop === "undefined") {
      toast.error("Payment system is loading");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: session?.user?.email || "example@example.com",
      amount: 80000, // 800 * 100 kobo
      currency: "NGN",
      callback: async (response) => {
        try {
          const backendResponse = await myAxios.post(
            "/payments/paystack/verify",
            {
              reference: response.reference,
              amount: 80000,
              email: session?.user?.email,
            }
          );

          if (backendResponse?.data?.success) {
            toast.success("Payment successful");
            router.push("/billings");
          } else {
            toast.error("Payment verification failed");
          }
        } catch (error) {
          toast.error("Payment verification error");
        }
      },
      onClose: () => {
        toast.error("Payment cancelled");
      },
    });

    handler.openIframe();
  };

  return (
    <div>
      <button onClick={handlePaystackPayment} disabled={!isPaystackReady}>
        {isPaystackReady ? "Pay Now" : "Loading Payment..."}
      </button>
    </div>
  );
};

export default Checkout;
