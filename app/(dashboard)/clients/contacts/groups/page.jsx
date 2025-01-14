"use client";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/tables/DataTable";
import { GroupContactColumns } from "@/components/tables/GroupContactColumns";
import { getLabelAndValue } from "@/lib/calculateFn";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { deleteGroup, fetchGroupsByUser } from "@/actions/group";
import toast from "react-hot-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Groups() {
  const { data: session } = useSession();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const id = session?.user?.id;
  // console.log("Groups id:", id);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const res = await fetchGroupsByUser(id);

          setGroups(res.groups);
        } catch (error) {
          console.error("Error fetching groups:", error);
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

  const handleEdit = (group) => {
    console.log("Edit group:", group);
    // Navigate to the edit page with the group ID
    router.push(`/groups/edit/${group.id}`);
  };

  const handleDelete = async (groupId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this group?"
    );

    if (!isConfirmed) return;

    try {
      await deleteGroup(groupId);
      toast.success("Group deleted successfully!");
      setGroups((prevGroups) =>
        prevGroups.filter((group) => group._id !== groupId)
      );
    } catch (error) {
      toast.error("Error deleting group: " + error.message);
      console.error("Error deleting group:", error);
    }
  };

  const tableFilterOptions = getLabelAndValue(groups, "name", "name");
  const tableFilterTitle = {
    contact: "Contact",
    group: "Group",
  };

  if (loading) {
    return <div>Loading groups...</div>;
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <PageHeader
            heading="Groups"
            className=""
            description={"Use this as a guide to Create your Groups"}
          ></PageHeader>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/clients/contacts/groups/add">
            <Button>Add Group</Button>
          </Link>
        </div>
      </div>
      <section className="space-y-6">
        <DataTable
          columns={GroupContactColumns({ handleEdit, handleDelete })}
          data={groups}
          tableFilterOptions={tableFilterOptions}
          tableFilterTitle={tableFilterTitle}
        />
      </section>
    </div>
  );
}
