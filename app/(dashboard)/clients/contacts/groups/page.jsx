"use client";
import { PageHeader } from "@/components/ui/page-header";
import { CardDetails } from "@/components/ui/card";
import { Archive, CheckCircle, Hourglass, Users } from "lucide-react";
import DataTable from "@/components/tables/DataTable";
import { groupsData } from "@/components/tables/data";
import { GroupContactColumns } from "@/components/tables/GroupContactColumns";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";

const cardData = [
  {
    title: "Total Groups",
    icon: Users,
    value: "120",
    percentage: "+10.5%",
    description: "from last quarter",
  },
  {
    title: "Active Groups",
    icon: CheckCircle,
    value: "90",
    percentage: "+8.1%",
    description: "from last month",
  },
  {
    title: "Pending Groups",
    icon: Hourglass,
    value: "15",
    percentage: "+20%",
    description: "from last week",
  },
  {
    title: "Archived Groups",
    icon: Archive,
    value: "10",
    percentage: "+5%",
    description: "from last year",
  },
];

export default function Groups() {
  // Fetch group data from the backend
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["groups"],
  //   queryFn: async () => {
  //     const response = await axios.get("/api/groups");
  //     return response.data;
  //   },
  // });

  // console.log("data :", data);

  // if (isLoading) return <p>Loading groups...</p>;
  // if (isError) return <p>Failed to load groups.</p>;

  return (
    <div className=" relative">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <PageHeader
            heading="Groups"
            className=""
            description={"Use this as a guide to Create your Group"}
          ></PageHeader>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/clients/contacts/groups/add">
            <Button>Add Group</Button>
          </Link>
        </div>
      </div>

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
        <DataTable columns={GroupContactColumns} data={groupsData} />
      </section>
    </div>
  );
}
