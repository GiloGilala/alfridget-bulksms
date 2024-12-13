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
import DataTable from "@/components/tables/DataTable";
import { providerConfigsData } from "@/components/tables/data";
import { ProvidersColumns } from "@/components/tables/ProvidersColumns";
import { fetchAllUsers } from "@/actions/user";

export const metadata = {
  title: "Dashboard",
  description: "Check out some examples app built using the components.",
};

const cardData = [
  {
    title: "Total Messages",
    icon: MessageSquare,
    value: "335",
    percentage: "+20.1%",
    description: "from last month",
  },
  {
    title: "Sent Messages",
    icon: MailCheck,
    value: "255",
    percentage: "+15.6%",
    description: "from last quarter",
  },
  {
    title: "Pending",
    icon: Hourglass,
    value: "161",
    percentage: "+30.8%",
    description: "from last year",
  },
  {
    title: "Failed Messages",
    icon: MailX,
    value: "54",
    percentage: "+25.9%",
    description: "from last month",
  },
];

const fetchUsers = async () => {
  try {
    const users = await fetchAllUsers();
    console.log("Users:", users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

fetchUsers();

export default function providerConfigs() {
  return (
    <div className=" relative">
      <PageHeader
        heading="Service Providers"
        className=""
        // description={
        //   "Dashboard, cards, authentication. Some examples built using the components. Use this as a guide to build your own"
        // }
      ></PageHeader>
      <section className="space-y-6">
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
        <DataTable columns={UsersColumns} data={providerConfigsData} />
      </section>
    </div>
  );
}
