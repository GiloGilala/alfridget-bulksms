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
import { ContactsColumns } from "@/components/tables/ContactsColumns";
import { getLabelAndValue } from "@/lib/calculateFn";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { deleteContact, fetchContactsByUser } from "@/actions/contact";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export default function Contacts() {
  const { data: session } = useSession();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter();

  const id = session?.user?.id;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const contacts = await fetchContactsByUser(id);
          setContacts(contacts);
        } catch (error) {
          console.error("Error fetching contacts:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      console.error("No user ID found.");
      setLoading(false);
    }
  }, [id]);

  // const handleEdit = (contact) => {
  //   router.push(`/contacts/add/${contact.id}`); // Navigate to the edit page with the contact ID
  // };

  const tableFilterOptions = getLabelAndValue(contacts, "name", "name");
  const tableFilterTitle = {
    contact: "Contact",
    group: "Group",
  };

  const handleEdit = (contact) => {
    console.log("Edit contact:", contact);
    setEditingContact(contact);
    setShowEditModal(true);
  };

  const handleDelete = async (contactId) => {
    // Show confirmation before proceeding
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (!isConfirmed) {
      return; // Exit if the user cancels the deletion
    }

    setLoading(true); // Show loading state

    try {
      // Proceed with deletion
      const response = await deleteContact(contactId); // Call the delete function
      toast.success("Contact deleted successfully!"); // Show success toast

      // Remove the contact from the list after deletion
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact._id !== contactId)
      );
    } catch (err) {
      // Handle errors and show error toast
      toast.error(
        err.message || "An error occurred while deleting the contact"
      );
      console.error("Error deleting contact:", err);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  if (loading) {
    return <div>Loading contacts...</div>;
  }

  return (
    <div className=" relative">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <PageHeader
            heading="Contacts"
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
        {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cardData.map((data, index) => (
            <CardDetails key={index} title={data.title} icon={data.icon}>
              <div className="text-2xl font-bold">{data.value}</div>
              <p className="text-xs text-muted-foreground">
                {data.percentage} {data.description}
              </p>
            </CardDetails>
          ))}
        </div> */}
        <DataTable
          columns={ContactsColumns({ handleEdit, handleDelete })}
          // columns={ContactsColumns({ handleDelete })}
          data={contacts}
          tableFilterOptions={tableFilterOptions}
          tableFilterTitle={tableFilterTitle}
        />
      </section>
    </div>
  );
}
