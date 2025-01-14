"use client";

import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/ui/page-header";
import { CardDetails } from "@/components/ui/card";
import {
  Activity,
  UserPlus,
  UserIconComponent,
  UserX,
  User,
} from "lucide-react";
import DataTable from "@/components/tables/DataTable";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getLabelAndValue } from "@/lib/calculateFn";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { UsersColumns } from "@/components/tables/UsersColumns";
import { fetchUsers } from "@/actions/user";

const cardData = [
  {
    title: "Total Users",
    icon: User,
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

export default function Users() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter();

  const id = session?.user?.id;
  //   console.log("id :", id);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const res = await fetchUsers();
          //   console.log("res :", res);

          setUsers(res.users);
        } catch (error) {
          console.error(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      console.error("No user ID found.");
      setLoading(false);
    }
  }, [id]); // Ensure this effect runs whenever `id` changes

  // const handleEdit = (user) => {
  //   router.push(`/users/add/${user.id}`); // Navigate to the edit page with the user ID
  // };

  const tableFilterOptions = getLabelAndValue(users, "role", "role");
  const tableFilterTitle = {
    user: "User",
  };

  const handleEdit = (user) => {
    console.log("Edit user:", user);
    setEditinguser(user);
    setShowEditModal(true);
  };

  const handleDelete = async (userId) => {
    // Show confirmation before proceeding
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!isConfirmed) {
      return; // Exit if the user cancels the deletion
    }

    setLoading(true); // Show loading state

    try {
      // Proceed with deletion
      const response = await deleteuser(userId); // Call the delete function
      toast.success("user deleted successfully!"); // Show success toast

      // Remove the user from the list after deletion
      setUsers((prevusers) => prevusers.filter((user) => user._id !== userId));
    } catch (err) {
      // Handle errors and show error toast
      toast.error(err.message || "An error occurred while deleting the user");
      console.error("Error deleting user:", err);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto  w-full">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
        <div>
          <PageHeader
            heading="Users"
            description="Use this as a guide to create your user"
          />
        </div>
        <div className="flex items-center space-x-2">
          {/* <Link href="/clients/users/add">
            <Button>Add user</Button>
          </Link> */}
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-12 gap-4 mt-6">
        {cardData.map((data, index) => (
          <CardDetails
            key={index}
            title={data.title}
            icon={data.icon}
            iconColor={data.iconColor}
            className="col-span-12 sm:col-span-6 lg:col-span-3"
          >
            <div className="text-2xl font-bold">{data.value}</div>
            <p className="text-xs text-muted-foreground">
              {data.percentage} {data.description}
            </p>
          </CardDetails>
        ))}
      </div>

      {/* Data Table */}
      <div className="col-span-12 mt-6 overflow-x-auto">
        <DataTable
          columns={UsersColumns({ handleEdit, handleDelete })}
          data={users}
          tableFilterOptions={tableFilterOptions}
          tableFilterTitle={tableFilterTitle}
        />
      </div>
    </div>
  );
}
