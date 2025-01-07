"use client";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import toast from "react-hot-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createGroup, fetchGroupById, updateGroup } from "@/actions/group";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import GroupForm from "@/components/groups/GroupForm";

export default function AddGroup() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = useParams();
  const [group, setGroup] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchGroup = async () => {
        try {
          const res = await fetchGroupById(id);
          console.log("Group created:", res);
          setGroup(res.group);
        } catch (error) {
          console.error("Error fetching group:", error);
        }
      };
      fetchGroup();
    }
  }, [id]);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      if (group?._id) {
        const res = await updateGroup(group._id, data);
        console.log("Updated group:", res);
        if (res.successful) {
          toast.success(res.message);
        }
        console.log("Group created:", res);
      } else {
        const res = await createGroup({
          ...data,
          userId: session?.user?.id,
        });

        if (res.successful) {
          toast.success(res.message);
        }
        console.log("Group created:", res);
      }

      router.push("/clients/contacts/groups");
    } catch (error) {
      // console.error("Error:", error.message);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <PageHeader
            heading="Add Group"
            className=""
            description={"Use this as a guide to Create your Group"}
          ></PageHeader>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/clients/groups/add">
            <Button>Add Group</Button>
          </Link>
        </div>
      </div>
      <section className="space-y-6">
        <div>
          <GroupForm
            defaultValues={group}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            handleSubmit={handleSubmit}
          />
        </div>
      </section>
    </div>
  );
}
