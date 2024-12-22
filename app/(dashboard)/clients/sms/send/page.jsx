"use client";
import { PageHeader } from "@/components/ui/page-header";
import toast from "react-hot-toast";
import { groupsData, smsFormData } from "@/components/tables/data";
import CampaignForm from "@/components/campaign/CampaignForm";
import { useSession } from "next-auth/react";
import myAxios from "@/lib/axiosConfig";
import { SuccessfulPopup } from "@/components/Successful";
import { calculateStatusCounts } from "@/lib/calculateFn";
import { useState } from "react";
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

const response = {
  Message: "Sent to 20/20 Total Cost: KES 44.0802 Message parts: 1",
  Recipients: [
    {
      cost: "NGN 2.2000",
      messageId: "ATXid_938c5562c87611b605e7bd3b2f135e0e",
      number: "+2348056026428",
      status: "Success",
      statusCode: 101,
    },
    {
      cost: "NGN 2.2000",
      messageId: "ATXid_f6d9dc052915e282b4d2b05942a44b96",
      number: "+2348062846800",
      status: "Success",
      statusCode: 101,
    },
    {
      cost: "NGN 2.2000",
      messageId: "ATXid_424abc86c13b9457220fa186566dbd7a",
      number: "+2348035538208",
      status: "Success",
      statusCode: 101,
    },
    {
      cost: "NGN 2.2000",
      messageId: "ATXid_7a4f6c8d8e4f6c8d8e4f",
      number: "+2348022333444",
      status: "Success",
      statusCode: 101,
    },
    {
      cost: "NGN 2.2000",
      messageId: "ATXid_1a2b3c4d5e6f7g8h",
      number: "+2348076543210",
      status: "Success",
      statusCode: 101,
    },
    {
      cost: "NGN 2.2000",
      messageId: "ATXid_9a8b7c6d5e4f3g2h",
      number: "+2348087654321",
      status: "Success",
      statusCode: 101,
    },
    {
      cost: "NGN 2.2000",
      messageId: "ATXid_6f5d4c3b2a1d9e8f",
      number: "+2348090123456",
      status: "Success",
      statusCode: 101,
    },
    {
      cost: "NGN 2.2000",
      messageId: "ATXid_3g4h5j6k7l8m9n",
      number: "+2348101112222",
      status: "Success",
      statusCode: 101,
    },
    {
      cost: "NGN 2.2000",
      messageId: "ATXid_2m9n8l7k6j5h4g",
      number: "+2348112233444",
      status: "Success",
      statusCode: 101,
    },
    {
      cost: "NGN 2.2000",
      messageId: "ATXid_5e4f3g2h1d9c8a",
      number: "+2348123456789",
      status: "Success",
      statusCode: 101,
    },
    {
      cost: "NGN 2.2000",
      messageId: "ATXid_4c3b2a1d9e8f6g",
      number: "+2348134567890",
      status: "Success",
      statusCode: 101,
    },
    {
      cost: "NGN 2.2000",
      messageId: "ATXid_8l7k6j5h4g3f2e",
      number: "+2348145678901",
      status: "Success",
      statusCode: 101,
    },
    {
      cost: "NGN 2.2000",
      messageId: "ATXid_d8e7f6c5b4a3g2h",
      number: "+2348156789012",
      status: "Success",
      statusCode: 101,
    },
    {
      cost: "NGN 2.2000",
      messageId: "ATXid_c9a8b7c6d5e4f",
      number: "+2348167890123",
      status: "Success",
      statusCode: 101,
    },
    {
      cost: "NGN 2.2000",
      messageId: "ATXid_b2a1d9e8f6g5h",
      number: "+2348178901234",
      status: "Success",
      statusCode: 101,
    },
  ],
};

export default function AddCampaign() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(true);
  const [balance, setBalance] = useState(0);
  const [credit, setCredit] = useState(2800 || session.user.credit);
  const [smstoSend, setSmstoSend] = useState(0);
  const [importedContacts, setImportedContacts] = useState([]);
  const [importedGroupContacts, setImportedGroupContacts] = useState([]);
  const [recipientsInput, setRecipientsInput] = useState([]);

  const perSms = 2.83;
  const availableSms = Math.floor(credit / perSms);

  const combineContacts = () => {
    return [...importedContacts, ...importedGroupContacts, ...recipientsInput]
      .filter((contact) => contact?.number)
      .map((contact) => contact.number)
      .join(", ");
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  // if (!session) {
  //   return <div>You are not signed in</div>;
  // }

  const statusDetail = calculateStatusCounts(
    response.Recipients,
    statusCodeMap
  );

  const handleSubmit = async (data) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to send an SMS.");
      return;
    }

    const contacts = combineContacts();
    console.log("contacts :", contacts);
    try {
      const smsData = {
        ...data,
        senderId: session?.user?.id,
      };

      const response = await myAxios.post("/campaign/sms", smsData);

      if (response.data.success) {
        toast.success(response.data.message);
        setBalance(response.data.credit);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to create the sms. Please try again.");
    }
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
              groups={groupsData}
              setSmstoSend={setSmstoSend}
              setImportedGroupContacts={setImportedGroupContacts}
              setRecipientsInput={setRecipientsInput}
              balance={balance}
            />
          </div>
          <div className="col-span-12 lg:col-span-7 space-y-2">
            <BalanceInfo
              title="Credit"
              amonut={balance}
              score={smstoSend}
              maxScore={availableSms}
              icon={<HelpCircle className="text-blue-500 w-5 h-5" />}
              badgeColor="bg-green-50"
              badgeTextColor="text-green-500"
              progressColor="blue"
            />
            <DataTable columns={SmsFormColumns} data={smsFormData} />
          </div>
        </div>
        <SuccessfulPopup
          details={statusDetail}
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
  amonut,
}) => {
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
          <CardDescription className="flex mb-1">
            <div className="flex items-center w-full">
              <span className="font-medium text-sm mr-auto text-gray-700 flex items-center">
                {amonut}
                {/* <HelpCircle className="ml-2 shrink-0 w-5 h-5 text-gray-500" /> */}
              </span>
              <span
                className={`px-2 py-1 rounded-lg ${badgeColor} ${badgeTextColor} text-xs`}
              >
                {score} / {maxScore}
              </span>
            </div>
          </CardDescription>
          <Progress
            value={(score / maxScore) * 100}
            className={`overflow-hidden bg-${progressColor}-50 h-1 rounded-full w-full`}
          />
        </CardContent>
      </div>
    </Card>
  );
};
