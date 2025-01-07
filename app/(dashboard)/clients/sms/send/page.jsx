"use client";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import toast from "react-hot-toast";
import CampaignForm from "@/components/campaign/CampaignForm";
import { useSession } from "next-auth/react";
import myAxios from "@/lib/axiosConfig";
import { SuccessfulPopup } from "@/components/Successful";
import { calculateStatusCounts, getLabelAndValue } from "@/lib/calculateFn";
import { SmsFormColumns } from "@/components/tables/SmsFormColumns";
import DataTable from "@/components/tables/DataTable";
import { HelpCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useParams, useRouter } from "next/navigation";
import { fetchCampaignById, updateCampaign } from "@/actions/campaign";
import { fetchGroupsByUser } from "@/actions/group";

const statusCodeMap = [
  { label: "Processed", value: 100 },
  { label: "Sent", value: 101 },
  { label: "Queued", value: 102 },
  { label: "Risk Hold", value: 401 },
  { label: "Internal Server Error", value: 500 },
  { label: "Invalid Sender ID", value: 402 },
  { label: "Invalid Phone Number", value: 403 },
  { label: "Unsupported Number Type", value: 404 },
  // { label: "Insufficient Balance", value: 405 },
  // { label: "User in Blacklist", value: 406 },
  // { label: "Could Not Route", value: 407 },
  // { label: "Do Not Disturb Rejection", value: 409 },
  // { label: "Gateway Error", value: 501 },
  // { label: "Rejected by Gateway", value: 502 },
];

export default function AddCampaign() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [credit, setCredit] = useState(session?.user?.credit);
  const [importedContacts, setImportedContacts] = useState([]);
  const [recipientsInput, setRecipientsInput] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [campaign, setCampaign] = useState({});
  const [statusDetail, setStatusDetail] = useState([]);
  const [groups, setGroups] = useState([]);
  const [smsTable, setsmsTable] = useState([]);

  const userId = session?.user?.id;

  useEffect(() => {
    if (session?.user?.credit) {
      setCredit(session?.user?.credit);
      // setsmsTable(response);
    }

    const fetchCampaign = async () => {
      try {
        const res = await fetchCampaignById(id);
        setCampaign(res.campaign);
      } catch (error) {
        console.error("Error fetching contact:", error);
        // toast.error("Failed to fetch contact.");
      }
    };
    const fetchGroups = async () => {
      try {
        const res = await fetchGroupsByUser(userId);
        setGroups(res.groups);
      } catch (error) {
        console.error("Error fetching contact:", error);
        // toast.error("Failed to fetch contact.");
      }
    };

    fetchGroups();

    if (id) {
      fetchCampaign();
    }
  }, [userId]);

  console.log("groups :", groups);

  const perSms = 2.83;
  const smstoSend = importedContacts.length + recipientsInput.length;
  const availableSms = credit ? Math.floor(credit / perSms) : 0;

  const combineContacts = [...importedContacts, ...recipientsInput];
  // .filter((contact) => contact?.number)
  // .map((contact) => contact.number)
  // .join(", ");

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  // if (!session) {
  //   return <div>You are not signed in</div>;
  // }

  const handleSubmit = async (data) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to send an SMS.");
      return;
    }

    setIsSubmitting(true); // Set submitting state

    const smsData = {
      ...data,
      senderId: session?.user?.id,
    };

    try {
      const res = await myAxios.post("/campaign/sms", smsData);
      // const res = await createCampaignt(smsData);
      if (res.data.success) {
        toast.success(res.data.message);
        setBalance(res.data.balance);
        setCampaign(res.data.campaign);
        const statusDetails = calculateStatusCounts(
          res.data.campaign.recipients,
          statusCodeMap
        );
        setsmsTable(res.data.campaign.recipients);
        setStatusDetail(statusDetails);
        setIsOpen(true);
        // router.push("/clients/sms");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message);
      // toast.error("Failed to save contact. Please try again.");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  const tableFilterTitle = {
    contact: "Contact",
    group: "Group",
  };

  return (
    <div className=" relative">
      <PageHeader
        heading="Send SMS"
        className=""
        description={"Use this as a guide to build your own"}
      ></PageHeader>
      <section className="space-y-6">
        <div className="grid grid-cols-12 gap-7">
          <div className="col-span-12 lg:col-span-5">
            <CampaignForm
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              groups={groups}
              setRecipientsInput={setRecipientsInput}
              balance={balance}
              campaign={campaign}
            />
          </div>
          <div className="col-span-12 lg:col-span-7 space-y-2">
            <BalanceInfo
              title="Credit"
              amonut={credit?.toLocaleString()}
              score={smstoSend}
              maxScore={availableSms}
              icon={<HelpCircle className="text-blue-500 w-5 h-5" />}
              badgeColor="bg-green-50"
              badgeTextColor="text-green-500"
              progressColor="blue"
            />
            <DataTable columns={SmsFormColumns} data={smsTable} />
          </div>
        </div>
        <SuccessfulPopup
          details={statusDetail}
          balance={balance}
          smsCost={campaign.credit}
          className="col-span-12 "
          isOpen={isOpen}
          onClose={handleClose}
          title="Sent Successful"
          message="Your Bluk SMS was sent Successful."
          buttonTitle={"Close"}
        />

        {/* <CircleProgress size={150} percentage={50} strokeWidth={5} /> */}
      </section>
    </div>
  );
}

export const BalanceInfo = ({
  title,
  score,
  maxScore,
  icon,
  badgeColor,
  badgeTextColor,
  progressColor,
  amount,
}) => {
  // console.log("amount :", amount);

  return (
    <Card className="bg-white shadow-md rounded-lg p-2 w-full ">
      <CardHeader className="flex-row items-center p-0 ml-3">
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <div className="flex items-center w-full">
        <div className="w-6 h-6 shrink-0 mr-1 rounded-full bg-blue-50 flex items-center justify-center">
          <span className="text-sm">₦</span>
        </div>

        <CardContent className="p-1 w-full ">
          <div className="flex mb-1">
            <div className="flex items-center w-full">
              <span className="font-medium text-sm mr-auto text-gray-700 flex items-center">
                {amount}
                {/* <HelpCircle className="ml-2 shrink-0 w-5 h-5 text-gray-500" /> */}
              </span>
              <span
                className={`px-2 py-1 rounded-lg ${badgeColor} ${badgeTextColor} text-xs`}
              >
                {score} / {maxScore}
              </span>
            </div>
          </div>
          <Progress
            value={(score / maxScore) * 100}
            className={`overflow-hidden bg-${progressColor}-50 h-1 rounded-full w-full`}
          />
        </CardContent>
      </div>
    </Card>
  );
};
