import Link from "next/link";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/ui/page-header";
import { CardDetails } from "@/components/ui/card";
import { Activity, UserPlus, Users, UserX } from "lucide-react";
import DataTable from "@/components/tables/DataTable";
import { usersData } from "@/components/tables/data";
import { UsersColumns } from "@/components/tables/UsersColumns";
import { fetchAllUsers } from "@/actions/user";

export const metadata = {
  title: "Dashboard",
  description: "Check out some examples app built using the components.",
};

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

const fetchUsers = async () => {
  try {
    const users = await fetchAllUsers();
    console.log("Users C:", users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

fetchUsers();

console.log("UserDashboard:");

export default function UserDashboard() {
  return (
    <div className=" relative">
      <PageHeader
        heading="User Dashboard"
        className=""
        // description={
        //   "Dashboard, cards, authentication. Some examples built using the components. Use this as a guide to build your own"
        // }
      ></PageHeader>
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
        <DataTable columns={UsersColumns} data={usersData} />
      </section>
    </div>
  );
}
