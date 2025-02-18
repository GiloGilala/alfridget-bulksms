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
import { Progress } from "@/components/ui/progress";
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
import { Topup1 } from "@/components/payment/TopUp";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CardCTA } from "@/components/dashboard/cards/CardCTA";
import {
  getWalletAndAllTransactions,
  getWalletByUserId,
} from "@/actions/wallet";
import { useRouter } from "next/navigation";
import { Loading1 } from "@/components/loaders";


const tabs = [
  { value: "orders", label: "Orders" },
  // { value: "products", label: "Products" },
  // { value: "customers", label: "Customers" },
];

const filterOptions = [
  { label: "pending", checked: true },
  { label: "completed", checked: false },
  { label: "cancelled", checked: false },
];

const headers = [
  { label: "Transaction ID", className: "" },
  { label: "Customer", className: "hidden sm:table-cell" },
  { label: "Status", className: "hidden sm:table-cell" },
  { label: "Date", className: "hidden md:table-cell" },
  { label: "Amount", className: "text-right" },
];

// Map transactions data to rows

// TabsWrapper Component
const TabsWrapper = ({ defaultValue, triggers, children }) => (
  <Tabs defaultValue={defaultValue}>
    <div className="flex-col items-center w-full">
      <div className="flex items-center justify-between">
        <TabsList>
          {triggers.map((trigger) => (
            <TabsTrigger key={trigger.value} value={trigger.value}>
              {trigger.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className=" flex items-center gap-2">
          <DropdownFilter />
          <ButtonWithIcon
            icon={ImportIcon}
            label="Export"
            variant="outline"
            size="sm"
          />
        </div>
      </div>
      {children}
    </div>
  </Tabs>
);

// DropdownFilter Component
const DropdownFilter = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="sm" className="h-8 gap-1">
        <FilterIcon className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Filter
        </span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {filterOptions.map((option) => (
        <DropdownMenuCheckboxItem key={option.label} checked={option.checked}>
          {option.label}
        </DropdownMenuCheckboxItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

// ButtonWithIcon Component
const ButtonWithIcon = ({ icon: Icon, label, ...props }) => (
  <Button {...props} className="h-8 gap-1">
    <Icon className="h-3.5 w-3.5" />
    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">{label}</span>
  </Button>
);

const DataTable = ({ headers, transactions }) => {

  const rows = transactions?.map((transaction) => [
    {
      content: (
        <Link href={`/transactions/${transaction._id}`}>
          #{transaction.reference}
        </Link>
      ),
      className: "font-medium",
    },
    {
      content: `${transaction.userId?.firstName} ${transaction.userId?.lastName}` || "N/A",
      className: "hidden sm:table-cell",
    },
    {
      content: (
        <Badge
          className={
            transaction.status === "completed"
              ? "bg-green-600 hover:bg-green-700 text-white" // Green for completed
              : transaction.status === "cancelled"
              ? "bg-red-600 hover:bg-red-700 text-white" // Red for failed
              : transaction.status === "pending"
              ? "bg-yellow-600 hover:bg-yellow-700 text-white" // Yellow for pending
              : "bg-gray-500 hover:bg-gray-600 text-white" // Default color
          }
        >
          {transaction.status}
        </Badge>
      ),
      className: "hidden sm:table-cell",
    },
    {
      content: new Date(transaction.createdAt).toLocaleDateString(), // Format date
      className: "hidden md:table-cell",
    },
    {
      content: `₦${transaction.amount} `,
      className: "text-right",
    },
  ]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index} className={header.className}>
              {header.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows?.map((row, index) => (
          <TableRow key={index}>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex} className={cell.className}>
                {cell.content}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};


export default function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false); // Add loading state
  const [wallet, setWallet] = useState({});
  const [transactions, setTransactions] = useState([]);
  const router = useRouter();

  const id = session?.user?.id;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setLoading(true); // Set loading to true before fetching data
        try {
          const res = await getWalletAndAllTransactions(id);
          setWallet(res?.wallet);
          setTransactions(res?.transactions);
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


  const pricingPlans = [
    {
      id: 1,
      name: "Regel SMS",
      price: 1833.0,
      description: "Regel sms price to work better",
      quantity: "Qty 1 • Billed monthly",
    },
    // {
    //   id: 2,
    //   name: "Regel Topup",
    //   price: 2544.0,
    //   description: "Regel to grow more",
    //   quantity: "Qty 1 • Billed monthly",
    // },
    
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {loading ? (
        <Loading1 />
      ) : (
        <div className="container mx-auto p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 mb-4">
              <CardCTA
                title="Are you getting low on credit!"
                description="Low credit alert! Avoid disruptions and top up your account now. Stay ahead with our easy and convenient top-up options."
                buttonText="TopUp Now"
                handleButtonClick={handleTopUp}
                modalButton={true}
                pricingPlans={pricingPlans}
                paymentType="card"
              />
            </div>

            <div className="lg:col-span-4 mb-4">
              <CardProgress
                title="Your balance"
                amount={CurrencyFormatter(wallet?.balance, "NGN")}
                percentage="25%"
                progressValue={75}
                Icon={CreditCard}
                iconColor="text-emerald-500"
              />
            </div>

            <div className="lg:col-span-12 mb-4">
              <TabsWrapper defaultValue="orders" triggers={tabs}>
                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Transactions</CardTitle>
                      <CardDescription>
                        Manage your Transactions and view their status.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DataTable
                        headers={headers}
                        transactions={transactions}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </TabsWrapper>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function ImportIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v12" />
      <path d="m8 11 4 4 4-4" />
      <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" />
    </svg>
  );
}
