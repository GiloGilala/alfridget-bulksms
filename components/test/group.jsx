"use client";
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
import { groupsData } from "@/components/tables/data";
import { GroupContactColumns } from "@/components/tables/GroupContactColumns";
import GroupForm from "@/components/groups/GroupForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CampaignForm from "@/components/campaign/CampaignForm";
import ClientForm from "@/components/client/ClientForm";
import ContactForm from "@/components/contact/ContactForm";
import PlanForm from "@/components/plan/PlanForm";
import { Button } from "@/components/ui/button";

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

const groupObject = {
  name: "Existing Group",
  description: "This is an existing group",
  contactIds: ["123", "456"],
  isActive: true,
};

export default function Groups() {
  const handleSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className=" relative">
      <div className="flex items-center justify-between space-y-2">
        <div>
          {/* <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p> */}
          <PageHeader
            heading="Groups"
            className=""
            description={" Use this as a guide to Create your Group"}
          ></PageHeader>
        </div>
        <div className="flex items-center space-x-2">
          <Button>Add Group</Button>
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
