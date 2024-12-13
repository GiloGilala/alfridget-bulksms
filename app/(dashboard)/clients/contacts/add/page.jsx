"use client";
import { PageHeader } from "@/components/ui/page-header";
import ContactForm from "@/components/contact/ContactForm";
import toast from "react-hot-toast";
import { contactsData, groupsData } from "@/components/tables/data";
import { createContact } from "@/actions/contact";
import { useSession } from "next-auth/react";

export default function AddContact() {
  const { data: session } = useSession();

  // if (!session) {
  //   return <div>You are not signed in</div>;
  // }

  const handleSubmit = async (data) => {
    try {
      const contact = await createContact({
        ...data,
        userId: session?.user?.id,
      });
      console.log("Contact created:", contact);
      toast.success("Dashborad created successfully!");
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to create the group. Please try again.");
    }
  };

  console.log("contactsData :", contactsData);
  console.log("groupsData :", groupsData);

  const newContactData = {
    userId: session?.user?.id,
    name: "Jane Doe",
    phone: "+234070567890",
    email: "doe@example.com",
    location: "Lagos",
    country: "USA",
    state: "LA",
    notes: "Preferred contact time: afternoons",
    isActive: true,
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
          <ContactForm
            handleSubmit={handleSubmit}
            groups={groupsData}
            contacts={contactsData}
          />
        </div>
      </section>
    </div>
  );
}
