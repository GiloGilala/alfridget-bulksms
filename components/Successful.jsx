import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Ban,
  CircleDashed,
  ClockArrowDown,
  HelpCircle,
  MailCheck,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

// Create a Shadow popup
export function SuccessfulPopup({
  title,
  message,
  details = [],
  iconProps,
  className,
  buttonTitle,
  isOpen,
  onClose,
  balance,
  smsCost,
}) {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50",
        className
      )}
    >
      <div className="bg-white rounded-lg shadow-md p-4 w-96 space-y-4">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-1 ">
          <CircleCheckIcon
            className="h-12 w-12 text-green-500"
            {...iconProps}
          />
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{message}</p>
        </div>
        <div className="flex justify-between space-x-2">
          <BalanceInfo
            title="Balance"
            amonut={balance}
            score={6.2}
            maxScore={10}
            icon={<HelpCircle className="text-blue-500 w-5 h-5" />}
            badgeColor="bg-green-50"
            progressColor="blue"
          />
          <BalanceInfo
            title="SMS Cost"
            amonut={smsCost}
            score={6.2}
            maxScore={10}
            icon={<HelpCircle className="text-blue-500 w-5 h-5" />}
            badgeColor="bg-red-50"
            progressColor="blue"
          />
        </div>

        {/* Card Section */}
        <Card className="mb-2">
          <CardHeader className=" p-4">
            <CardTitle className="text-base font-normal ">
              Report Summary
            </CardTitle>
            {/* <CardDescription>Your payment details</CardDescription> */}
          </CardHeader>
          <CardContent className="grid gap-1">
            {details.map((detail, index) => (
              <div key={index}>
                {detail.value !== "0" ? (
                  <div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-muted-foreground flex items-center">
                        {detail.label === "Processed" ? (
                          <CircleDashed className="h-4 w-4 text-green-400" />
                        ) : detail.label === "Sent" ? (
                          <MailCheck className="h-4 w-4 text-green-400" />
                        ) : detail.label === "Queued" ? (
                          <ClockArrowDown className="h-4 w-4 text-green-400" />
                        ) : (
                          <Ban className="h-4 w-4 text-green-500" />
                        )}
                        <span className="text-muted-foreground px-2">
                          {detail.label}
                        </span>
                      </span>
                      <span className="font-medium">{detail.value}</span>
                    </div>
                    {index < details.length - 1 && <Separator />}
                  </div>
                ) : null}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Footer Section */}
        {buttonTitle && (
          <div className="w-full">
            <Button onClick={onClose}>{buttonTitle}</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export const BalanceInfo = ({
  title,
  score,
  maxScore,
  icon,
  badgeColor,
  progressColor,
  amonut,
}) => {
  return (
    <Card className="bg-white shadow-md rounded-lg p-2 w-full ">
      <CardHeader className="flex-row items-center p-0 ml-3">
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <div className="flex items-center w-full">
        <div className="w-6 h-6 shrink-0 mr-1 rounded-full bg-blue-50 flex items-center justify-center">
          <span className="text-sm">₦</span>
        </div>

        <CardContent className="p-1 w-full ">
          <CardDescription className="flex mb-1">
            <div className="flex items-center w-full">
              <span className="font-medium text-sm mr-auto text-gray-700 flex items-center">
                {amonut?.toLocaleString()}
                {/* <HelpCircle className="ml-2 shrink-0 w-5 h-5 text-gray-500" /> */}
              </span>
              <span
                className={`px-2 py-1 rounded-lg ${badgeColor} text-${badgeColor}-500 text-xs`}
              >
                {score} / {maxScore}
              </span>
            </div>
          </CardDescription>
          <Progress
            value={(score / maxScore) * 100}
            className={`overflow-hidden bg-${progressColor}-50 h-1 rounded-full w-full`}
          />
        </CardContent>
      </div>
    </Card>
  );
};

export function PaymentSuccessful() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <CircleCheckIcon className="mx-auto h-12 w-12 text-green-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Payment Successful!
        </h1>
        <p className="mt-4 text-muted-foreground">
          Thank you for your payment. Here are the details of your transaction:
        </p>
        <div className="mt-6 space-y-4 rounded-lg border bg-card p-6 text-left text-sm">
          <div className="flex items-center justify-between">
            <span className="font-medium">Order Number:</span>
            <span>123456789</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Amount Paid:</span>
            <span>$99.99</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Payment Method:</span>
            <span>Visa ending in 1234</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Transaction Date:</span>
            <span>August 6, 2024</span>
          </div>
        </div>
        <div className="mt-6">
          <Link
            href="#"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

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

export function PaymentSuccessful3() {
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
            href="#"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            View Order History
          </Link>
          <Link
            href="#"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            prefetch={false}
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
