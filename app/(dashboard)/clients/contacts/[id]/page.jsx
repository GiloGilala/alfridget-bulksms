"use client";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import ContactForm from "@/components/contact/ContactForm";
import toast from "react-hot-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { groupsData } from "@/components/tables/data";
import {
  createContact,
  fetchContactById,
  updateContact,
} from "@/actions/contact";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

export default function AddContact() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = useParams();
  const [contact, setContact] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [groups, setGroups] = useState(groupsData);

  useEffect(() => {
    // Fetch the contact by ID when the component mounts or when ID changes
    const fetchContact = async () => {
      try {
        const res = await fetchContactById(id);
        setContact(res); // Set the fetched contact data
      } catch (error) {
        console.error("Error fetching contact:", error);
        // toast.error("Failed to fetch contact.");
      }
    };

    if (id) {
      fetchContact();
    }
  }, [id]);

  // if (!session) {
  //   return <div>You are not signed in</div>;
  // }

  const handleSubmit = async (data) => {
    setIsSubmitting(true); // Set submitting state

    try {
      if (contact?._id) {
        const updatedContact = await updateContact(contact?._id, data); // Pass contact.id for update
        console.log("Updated contact:", updatedContact);
      } else {
        const newContact = await createContact({
          ...data,
          userId: session?.user?.id,
        });
        // console.log("Contact created:", newContact);
      }

      toast.success("Contact save successfully!");
      router.push("/clients/contacts"); // Navigate after success
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message);
      // toast.error("Failed to save contact. Please try again.");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  const newContactData = {
    name: "Alice Williams",
    phone: "+7654321098",
    groupId: "63f20f77b4c13c3c50f8f888",
    email: "alicewilliams@example.com",
    location: "Houston",
    country: "USA",
    state: "Texas",
  };

  return (
    <div className=" relative">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <PageHeader
            heading="Add Contact"
            className=""
            description={"Use this as a guide to Create your Contact"}
          ></PageHeader>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/clients/contacts/add">
            <Button>Add Contact</Button>
          </Link>
        </div>
      </div>
      <section className="space-y-6">
        <div>
          {/* <h1>Create/Update Group</h1> */}
          <ContactForm
            // defaultValues={newContactData}
            defaultValues={contact}
            groups={groups}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            handleSubmit={handleSubmit}
          />
        </div>
      </section>
    </div>
  );
}
