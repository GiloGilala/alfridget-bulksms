import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Announcement } from "@/components/ui/announcement";
import { CardDetails } from "@/components/ui/card";
import { BarChart3, ClipboardList, ShoppingBag, Users } from "lucide-react";

export const metadata = {
  title: "Dashboard",
  description: "Check out some examples app built using the components.",
};

const cardData = [
  {
    title: "Total Revenue",
    icon: BarChart3,
    value: "$45,231.89",
    percentage: "+20.1%",
    description: "from last month",
  },
  {
    title: "Total Sales",
    icon: ShoppingBag,
    value: "1,234",
    percentage: "+15.6%",
    description: "from last quarter",
  },
  {
    title: "Total Users",
    icon: Users,
    value: "10,000",
    percentage: "+30.8%",
    description: "from last year",
  },
  {
    title: "Total Orders",
    icon: ClipboardList,
    value: "5,000",
    percentage: "+25.9%",
    description: "from last month",
  },
];

export default function ClientsLayout({ children }) {
  return (
    <div className=" relative">
      <PageHeader
        heading="User Dashboard"
        className=""
        // description={
        //   "Dashboard, cards, authentication. Some examples built using the components. Use this as a guide to build your own"
        // }
      >
        {/* <PageActions>
          <Button asChild size="sm">
            <Link href="/docs">Get Started</Link>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link href="/components">Components</Link>
          </Button>
        </PageActions> */}
      </PageHeader>
      <section>
        {/* <ExamplesNav /> */}
        {/* <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
          {children}
        </div> */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cardData.map((data, index) => (
            <CardDetails key={index} title={data.title} icon={data.icon}>
              <div className="text-2xl font-bold">{data.value}</div>
              <p className="text-xs text-muted-foreground">
                {data.percentage} {data.description}
              </p>
            </CardDetails>
          ))}
        </div>
      </section>
    </div>
  );
}
