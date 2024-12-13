"use client";
import { PageHeader } from "@/components/ui/page-header";
import toast from "react-hot-toast";
import { groupsData } from "@/components/tables/data";
import CampaignForm from "@/components/campaign/CampaignForm";
import { useSession } from "next-auth/react";
import { createCampaign } from "@/actions/campaign";

export default function AddContact() {
  const { data: session } = useSession();

  // if (!session) {
  //   return <div>You are not signed in</div>;
  // }

  const handleSubmit = async (data) => {
    try {
      const campaign = await createCampaign({
        ...data,
        userId: session?.user?.id,
      });
      console.log("Campaign created:", campaign);
      toast.success("Campaign created successfully!");
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to create the group. Please try again.");
    }
  };

  return (
    <div className=" relative">
      {/* <PageHeader
        heading="Add Group"
        className=""
        description={"Use this as a guide to build your own"}
      ></PageHeader> */}
      <section className="space-y-6">
        <div>
          {/* <h1>Create/Update Group</h1> */}
          <CampaignForm handleSubmit={handleSubmit} groups={groupsData} />
        </div>
      </section>
    </div>
  );
}
