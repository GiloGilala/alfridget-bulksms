"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const PaymentSuccessful = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5); // Countdown timer in seconds

  // Automatically redirect the user after 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      router.push("/"); // Redirect to the homepage
    }, 5000); // Redirect after 5 seconds

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md text-center">
        <div className="bg-primary rounded-full p-4 inline-block mb-6">
          <CircleCheckIcon className="h-12 w-12 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Payment Successful
        </h1>
        <p className="mt-4 text-muted-foreground">
          Thank you for your payment. Your order is being processed and you will
          receive a confirmation email shortly.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Redirecting in {countdown} seconds...
        </p>
        <Progress value={(5 - countdown) * 20} className="mt-4 h-2" />{" "}
        {/* Progress bar */}
      </div>
      <div className="mt-8 w-full max-w-md space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-medium">$99.99</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Payment Method:</span>
              <span className="font-medium">Visa ending in 1234</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Transaction ID:</span>
              <span className="font-medium">ABC123456789</span>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-center gap-2">
          <Link
            href="/orders" // Replace with your order history page
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            View Order History
          </Link>
          <Link
            href="/" // Redirect to the homepage
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            prefetch={false}
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessful;

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
