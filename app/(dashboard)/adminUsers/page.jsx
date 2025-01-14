"use client";
import dynamic from "next/dynamic";
import { PageHeader } from "@/components/ui/page-header";
import { CardDetails } from "@/components/ui/card";
import { Activity, UserPlus, Users, UserX } from "lucide-react";
import {
  CardProgress,
  StatisticsCard1,
} from "@/components/dashboard/StatisticsCard";
import StatisticsCard3 from "@/components/dashboard/StatisticsCard3";
import StatisticsCard2 from "@/components/dashboard/StatisticsCard2";

const Sales = dynamic(() => import("@/components/dashboard/Sales"), {
  ssr: false,
});
const CustomerReview = dynamic(
  () => import("@/components/dashboard/CustomerReview"),
  { ssr: false }
);
const RecentOrders = dynamic(
  () => import("@/components/dashboard/RecentOrders"),
  { ssr: false }
);
const TopSeller = dynamic(() => import("@/components/dashboard/TopSeller"), {
  ssr: false,
});
const ReturningRate = dynamic(
  () => import("@/components/dashboard/ReturningRate"),
  { ssr: false }
);
const CustomerTransactions = dynamic(
  () => import("@/components/dashboard/CustomerTransactions"),
  { ssr: false }
);
const cardData = [
  {
    title: "Total Users",
    icon: Users,
    value: "1,234",
    percentage: "+10.5%",
    description: "from last month",
    iconColor: "text-blue-500", // Blue
  },
  {
    title: "Active Users",
    icon: Activity,
    value: "821",
    percentage: "+5.2%",
    description: "from last quarter",
    iconColor: "text-green-500", // Green
  },
  {
    title: "New Sign-ups",
    icon: UserPlus,
    value: "150",
    percentage: "+20.8%",
    description: "from last year",
    iconColor: "text-yellow-500", // Yellow
  },
  {
    title: "Inactive Users",
    icon: UserX,
    value: "120",
    percentage: "-5.1%",
    description: "from last month",
    iconColor: "text-red-500", // Red
  },
];

export default function AdminDashboard() {
  return (
    <div className=" relative">
      <PageHeader heading="Dashboard" className=""></PageHeader>
      <section className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cardData?.map((data, index) => (
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
          <CardProgress
            title="Sales"
            amount="$10,000"
            percentage="+25%"
            progressValue={75}
            className="col-span-12 lg:col-span-3"
          />

          <Sales className="col-span-12 lg:col-span-8" />
          <CustomerReview className="col-span-12 lg:col-span-4" />
          <RecentOrders className="col-span-12 lg:col-span-8" />
          <TopSeller className="col-span-12 lg:col-span-4" />
          <ReturningRate className="col-span-12 lg:col-span-4" />
          <CustomerTransactions className="col-span-12 lg:col-span-8" />
        </div>
      </section>
    </div>
  );
}
