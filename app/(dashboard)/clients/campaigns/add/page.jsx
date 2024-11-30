"use client";
import { PageHeader } from "@/components/ui/page-header";
import ContactForm from "@/components/contact/ContactForm";
import toast from "react-hot-toast";
import { groupsData } from "@/components/tables/data";

export default function AddContact() {
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
          <ContactForm handleSubmit={handleSubmit} groups={groupsData} />
        </div>
      </section>
    </div>
  );
}
