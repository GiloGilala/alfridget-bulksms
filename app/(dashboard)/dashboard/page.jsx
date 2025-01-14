"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CardCTA, CardProgress } from "@/components/dashboard/StatisticsCard";
import { CreditCard, MailCheck } from "lucide-react";
import { CurrencyFormatter } from "@/lib/currencyFormatter";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Chart1 } from "@/components/charts/Chart1";

const filterOptions = [
  {
    label: "Fulfilled",
    checked: true,
  },
  {
    label: "Declined",
    checked: false,
  },
  {
    label: "Refunded",
    checked: false,
  },
];

export default function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const pricingPlans = [
    {
      id: 1,
      name: "Regel SMS",
      price: 1833.0,
      description: "Regel sms price to work better",
      quantity: "Qty 1 • Billed monthly",
    },
    // {
    //   id: 2,
    //   name: "Regel Topup",
    //   price: 2544.0,
    //   description: "Regel to grow more",
    //   quantity: "Qty 1 • Billed monthly",
    // },
    // {
    //   id: 3,
    //   name: "Regel Enterprise",
    //   price: 5550.0,
    //   description: "Regel enterprise plan to scale up",
    //   quantity: "Qty 1 • Billed monthly",
    // },
  ];

  const creditWalletTransitions = [
    {
      id: "#TRX001",
      sender: "John Doe",
      receiver: "Jane Doe",
      amount: "$100.00",
      date: "January 1, 2023",
      status: "Successful",
    },
    {
      id: "#TRX002",
      sender: "Jane Doe",
      receiver: "Bob Smith",
      amount: "$50.00",
      date: "January 5, 2023",
      status: "Pending",
    },
    {
      id: "#TRX003",
      sender: "Bob Smith",
      receiver: "John Doe",
      amount: "$200.00",
      date: "January 10, 2023",
      status: "Failed",
    },
  ];

  const smsSent = [
    {
      id: "#SMS001",
      recipient: "John Doe",
      message: "Hello, your payment is successful.",
      date: "January 1, 2023",
      status: "Delivered",
    },
    {
      id: "#SMS002",
      recipient: "Jane Doe",
      message: "Hello, your payment is pending.",
      date: "January 5, 2023",
      status: "Pending",
    },
    {
      id: "#SMS003",
      recipient: "Bob Smith",
      message: "Hello, your payment failed.",
      date: "January 10, 2023",
      status: "Failed",
    },
  ];

  function calculatePreviousMonth(currentValue, percentageIncrease) {
    const decimalIncrease = percentageIncrease / 100;
    const previousMValue = currentValue / (1 + decimalIncrease);
    return previousMValue;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <div className="grid grid-cols-12 gap-4">
          <CardCTA
            className="col-span-12 lg:col-span-6 mb-4"
            title="Are you getting low on criedt!"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex."
            buttonText="TopUp Now"
            handleButtonClick={() => console.log("Top up Now")}
            modalButton={true}
            pricingPlans={pricingPlans}
          />

          <CardProgress
            className=" mb-4 col-span-12 lg:col-span-3"
            title="Monthly expenses"
            amount={CurrencyFormatter(6435, "NGN")}
            percentage="25%"
            progressValue={75}
            Icon={CreditCard}
            iconColor="text-emerald-500"
          />

          <CardProgress
            className=" mb-4 col-span-12 lg:col-span-3"
            title="Your balance"
            amount={CurrencyFormatter(session?.user?.credit, "NGN")}
            percentage="25%"
            progressValue={75}
            Icon={CreditCard}
            iconColor="text-emerald-500"
          />
          <div className="mb-4 col-span-12 lg:col-span-12">
            <Chart1 />
          </div>

          <div className="mb-4 col-span-12 lg:col-span-6">
            <Card>
              <CardHeader>
                <CardTitle>Credit Wallet Transitions</CardTitle>
                <CardDescription>View all transitions</CardDescription>
              </CardHeader>
              <CardContent>
                <TableComponent
                  headers={[
                    "Transition ID",
                    "Sender",
                    "Receiver",
                    "Amount",
                    "Receiver",
                    "Amount",
                    "Date",
                    "Status",
                  ]}
                  data={creditWalletTransitions}
                />
              </CardContent>
            </Card>
          </div>

          <div className="mb-4 col-span-12 lg:col-span-6">
            <Card>
              <CardHeader>
                <CardTitle>SMS Sent</CardTitle>
                <CardDescription>View all SMS</CardDescription>
              </CardHeader>
              <CardContent>
                <TableComponent
                  headers={["SMS ID", "Recipient", "Message", "Date", "Status"]}
                  data={smsSent}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export const TableComponent = ({ headers, data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {Object.values(row).map((value, index) => (
              <TableCell key={index}>{value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
