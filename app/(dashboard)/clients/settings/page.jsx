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

export default function Settings() {
  const handleSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className=" relative">
      <PageHeader
        heading="Contacts"
        className=""
        // description={
        //   "Dashboard, cards, authentication. Some examples built using the components. Use this as a guide to build your own"
        // }
      ></PageHeader>
      <section className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
      </section>
    </div>
  );
}
