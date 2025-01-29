"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CardProgress } from "@/components/dashboard/StatisticsCard";
import { CreditCard, MailCheck } from "lucide-react";
import { CurrencyFormatter } from "@/lib/currencyFormatter";
import { PaymentCart } from "@/lib/payment/PaymentCart";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Chart1 } from "@/components/charts/Chart1";
import { useRouter } from "next/navigation";
import { getWalletTransDashboard } from "@/actions/wallet";
import { Loading1 } from "@/components/loaders";
import { CardCTA } from "@/components/dashboard/cards/CardCTA";

const filterOptions = [
  {
    label: "Fulfilled",
    checked: true,
  },
  {
    label: "Declined",
    checked: false,
  },
  {
    label: "Refunded",
    checked: false,
  },
];

export default function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false); // Add loading state
  const [wallet, setWallet] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [sms, setSms] = useState([]);
  const router = useRouter();

  const id = session?.user?.id;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setLoading(true); // Set loading to true before fetching data
        try {
          const res = await getWalletTransDashboard(id);
          setWallet(res?.wallet);
          setTransactions(res?.transactions);
          setSms(res?.sms);
        } catch (error) {
          console.error("Error fetching wallet:", error);
        } finally {
          setLoading(false); // Reset loading to false after fetch completes
        }
      };
      fetchData();
    } else {
      console.error("No user ID found.");
      setLoading(false); // Ensure loading is false if no ID is found
    }
  }, [id]);

  const handleTopUp = () => {
    router.push("/billings/checkout");
  };

  // console.log("transaction :", transactions);
  // console.log("sms :", sms);

  const pricingPlans = [
    {
      id: 1,
      name: "Regel SMS",
      price: 1833.0,
      description: "Regel sms price to work better",
      quantity: "Qty 1 • Billed monthly",
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {loading ? (
        <Loading1 />
      ) : (
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <div className="grid grid-cols-12 gap-4">
            <CardCTA
              className="col-span-12 lg:col-span-8 mb-4"
              title="Are you getting low on credit!"
              description="Low credit alert! Avoid disruptions and top up your account now. Stay ahead with our easy and convenient top-up options."
              buttonText="TopUp Now"
              handleButtonClick={handleTopUp}
              modalButton={true}
              pricingPlans={pricingPlans}
              paymentType="card"
            />

            <CardProgress
              className="mb-4 col-span-12 lg:col-span-4"
              title="Your balance"
              amount={CurrencyFormatter(wallet?.balance, "NGN")}
              percentage="25%"
              progressValue={75}
              Icon={CreditCard}
              iconColor="text-emerald-500"
            />

            <div className="mb-4 col-span-12 lg:col-span-12">
              <Chart1 />
            </div>

            <div className="mb-4 col-span-12 lg:col-span-6">
              <Card>
                <CardHeader>
                  <CardTitle>Credit Wallet Transactions</CardTitle>
                  <CardDescription>View all transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <TableComponent
                    headers={[
                      "Reference Id",
                      "Amount",
                      "Currency",
                      "Status",
                      // "Type",
                      "Created At",
                    ]}
                    data={transactions}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="mb-4 col-span-12 lg:col-span-6">
              <Card>
                <CardHeader>
                  <CardTitle>SMS Sent</CardTitle>
                  <CardDescription>View all SMS</CardDescription>
                </CardHeader>
                <CardContent>
                  <TableComponent
                    headers={[
                      "Title",
                      // "Recipient",
                      "Message",
                      "Date",
                      "Status",
                    ]}
                    data={sms}
                    sms={true}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const TableComponent = ({ headers, data = [], sms }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((row, index) => (
          <TableRow key={index}>
            {sms ? (
              <>
                <TableCell className="whitespace-nowrap">{row.title}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {row.message}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {row.createdAt}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {row.status}
                </TableCell>
              </>
            ) : (
              <>
                <TableCell className="whitespace-nowrap">
                  {row.reference}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {row.amount}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {row.currency}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {row.status}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {new Date(row.createdAt).toLocaleDateString()}
                  {/* {row.createdAt} */}
                </TableCell>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
