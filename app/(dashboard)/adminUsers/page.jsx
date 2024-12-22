"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/ui/page-header";
import { CardDetails } from "@/components/ui/card";
import {
  Hourglass,
  MailCheck,
  MailWarning,
  MailX,
  MessageSquare,
} from "lucide-react";
import { columns } from "@/components/tables/Columns";
import DataTable from "@/components/tables/DataTable";
import { tableData } from "@/components/tables/data";

import toast from "react-hot-toast";
import StatisticsCard1 from "@/components/dashboard/StatisticsCard1";
import StatisticsCard3 from "@/components/dashboard/StatisticsCard3";
import { SuccessFul } from "@/components/Successful";
import StatisticsCard2 from "@/components/dashboard/StatisticsCard2";
import Sales from "@/components/dashboard/Sales";
import CustomerReview from "@/components/dashboard/CustomerReview";
import RecentOrders from "@/components/dashboard/RecentOrders";
import TopSeller from "@/components/dashboard/TopSeller";
import ReturningRate from "@/components/dashboard/ReturningRate";
import CustomerTransactions from "@/components/dashboard/CustomerTransactions";

const cardData = [
  {
    title: "Total Messages",
    icon: MessageSquare,
    value: "335",
    percentage: "+20.1%",
    description: "from last month",
    iconColor: "text-blue-500", // Blue
  },
  {
    title: "Sent Messages",
    icon: MailCheck,
    value: "255",
    percentage: "+15.6%",
    description: "from last quarter",
    iconColor: "text-green-500", // Green
  },
  {
    title: "Pending",
    icon: Hourglass,
    value: "161",
    percentage: "+30.8%",
    description: "from last year",
    iconColor: "text-yellow-500", // Yellow
  },
  {
    title: "Failed Messages",
    icon: MailX,
    value: "54",
    percentage: "+25.9%",
    description: "from last month",
    iconColor: "text-red-500", // Red
  },
];

const handleSubmit = async (data) => {
  try {
    toast.success("Dashborad created successfully!");
    console.log("Response:", data);
    // Optionally: refresh data or update local state
  } catch (error) {
    console.error(error);
    toast.error("Failed to create the group. Please try again.");
  }
};

export default function AdminDashboard() {
  return (
    <div className=" relative">
      <PageHeader heading="Dashboard" className=""></PageHeader>
      <section className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cardData.map((data, index) => (
            <CardDetails
              key={index}
              title={data.title}
              icon={data.icon}
              iconColor={data.iconColor}
            >
              <div className="text-2xl font-bold">{data.value}</div>
              <p className="text-xs text-muted-foreground">
                {data.percentage} {data.description}
              </p>
            </CardDetails>
          ))}
        </div>
        <div className="grid grid-cols-12 gap-7">
          <StatisticsCard1 className="col-span-12 lg:col-span-3" />
          <StatisticsCard2 className="col-span-12 lg:col-span-3" />
          <StatisticsCard3 className="col-span-12 lg:col-span-3" />
          <Sales className="col-span-12 lg:col-span-8" />
          <CustomerReview className="col-span-12 lg:col-span-4" />
          <RecentOrders className="col-span-12 lg:col-span-8" />
          <TopSeller className="col-span-12 lg:col-span-4" />
          <ReturningRate className="col-span-12 lg:col-span-4" />
          <CustomerTransactions className="col-span-12 lg:col-span-8" />

          {/* <StatisticsCard2 className="col-span-12 lg:col-span-3" />
      
      <StatisticsCard4 className="col-span-12 lg:col-span-3" />

      <Sales className="col-span-12 lg:col-span-8" />
      <CustomerReview className="col-span-12 lg:col-span-4" />

      <RecentOrders className="col-span-12 lg:col-span-8" />
      <TopSeller className="col-span-12 lg:col-span-4" />

      <ReturningRate className="col-span-12 lg:col-span-4" />
      <CustomerTransactions className="col-span-12 lg:col-span-8" /> */}
        </div>
        {/* <DataTable columns={columns} data={tableData} /> */}
      </section>
    </div>
  );
}
