"use client";
import { PageHeader } from "@/components/ui/page-header";
import ContactForm from "@/components/contact/ContactForm";
import toast from "react-hot-toast";
import { groupsData } from "@/components/tables/data";
import { useSession } from "next-auth/react";
import myAxios from "@/lib/axiosConfig";
import { useRouter } from "next/navigation";
import CampaignForm from "@/components/campaign/CampaignForm";

export default function AddCampaign() {
  const { data: session } = useSession();

  // if (!session) {
  //   return <div>You are not signed in</div>;
  // }
  const router = useRouter();

  const handleSubmit = async (data) => {
    console.log("handleSubmit:", data);

    try {
      const smsData = {
        ...data,
        userId: session?.user?.id,
      };
      const res = await myAxios.post("/campaign/sms", smsData);

      console.log("sms created:", res.data);
      if (res.data.success) {
        toast.success(res.data.message);

        // router.push("/login");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to create the sms. Please try again.");
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
