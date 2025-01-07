"use client";

import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/ui/page-header";
import { CardDetails } from "@/components/ui/card";
import { Hourglass, MailCheck, MailX, MessageSquare } from "lucide-react";
import DataTable from "@/components/tables/DataTable";
import { campaignsData } from "@/components/tables/data";
import toast from "react-hot-toast";
import { CampaignsColumns } from "@/components/tables/CampaignsColumns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLabelAndValue } from "@/lib/calculateFn";
import { deleteCampaign, fetchCampaignsByUser } from "@/actions/campaign";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loading1 } from "@/components/loaders";

const cardData = [
  {
    title: "Total Messages",
    icon: MessageSquare,
    value: "335",
    percentage: "+20.1%",
    description: "from last month",
    iconColor: "text-blue-500", // Blue
  },
  {
    title: "Sent Messages",
    icon: MailCheck,
    value: "255",
    percentage: "+15.6%",
    description: "from last quarter",
    iconColor: "text-green-500", // Green
  },
  {
    title: "Pending",
    icon: Hourglass,
    value: "161",
    percentage: "+30.8%",
    description: "from last year",
    iconColor: "text-yellow-500", // Yellow
  },
  {
    title: "Failed Messages",
    icon: MailX,
    value: "54",
    percentage: "+25.9%",
    description: "from last month",
    iconColor: "text-red-500", // Red
  },
];

export default function SmsHistory() {
  const { data: session } = useSession();
  const [smsHistory, setSmsHistory] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter();

  const id = session?.user?.id;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const res = await fetchCampaignsByUser(id);
          //            function sanitizeData(data) {
          // return JSON.parse(JSON.stringify(data));
          // }
          //           console.log("res :", res);

          setSmsHistory(res.campaigns);
        } catch (error) {
          console.error("Error fetching smsHistory:", error);
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

  const tableFilterOptions = getLabelAndValue(smsHistory, "name", "name");
  const tableFilterTitle = {
    sms: "sms",
    group: "Group",
  };

  const handleEdit = (sms) => {
    console.log("Edit sms:", sms);
    setEditingsms(sms);
    setShowEditModal(true);
  };

  const handleDelete = async (smsId) => {
    // Show confirmation before proceeding
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this sms?"
    );

    if (!isConfirmed) {
      return; // Exit if the user cancels the deletion
    }

    setLoading(true); // Show loading state

    try {
      // Proceed with deletion
      const res = await deleteCampaign(smsId);

      if (res.successful) {
        toast.success("sms deleted successfully!");

        setSmsHistory((prevSmsHistory) =>
          prevSmsHistory.filter((sms) => sms._id !== smsId)
        );
      }
    } catch (err) {
      // Handle errors and show error toast
      toast.error(err.message || "An error occurred while deleting the sms");
      console.error("Error deleting sms:", err);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className=" relative">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <PageHeader
            heading="SMS History"
            className=""
            description={"Use this as a guide to Create your SMS"}
          ></PageHeader>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/clients/sms/add">
            <Button>Add SMS</Button>
          </Link>
        </div>
      </div>
      <section className="space-y-6">
        {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cardData.map((data, index) => (
            <CardDetails
              key={index}
              title={data.title}
              icon={data.icon}
              iconColor={data.iconColor}
            >
              <div className="text-2xl font-bold">{data.value}</div>
              <p className="text-xs text-muted-foreground">
                {data.percentage} {data.description}
              </p>
            </CardDetails>
          ))}
        </div> */}
        {loading ? (
          <Loading1 />
        ) : (
          <DataTable
            columns={CampaignsColumns({ handleEdit, handleDelete })}
            data={smsHistory}
            tableFilterOptions={tableFilterOptions}
            tableFilterTitle={tableFilterTitle}
          />
        )}
      </section>
    </div>
  );
}
