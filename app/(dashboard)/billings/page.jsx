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
import { CardCTA, CardProgress } from "@/components/dashboard/StatisticsCard";
import { CreditCard, MailCheck } from "lucide-react";
import { CurrencyFormatter } from "@/lib/currencyFormatter";
import { Topup1 } from "@/components/payment/TopUp";
import { useState } from "react";
import { useSession } from "next-auth/react";

const data = [
  {
    title: "This Week",
    amount: "$1,329",
    percentage: "+25%",
    progressValue: 25,
  },
  {
    title: "This Month",
    amount: "$5,329",
    percentage: "+10%",
    progressValue: 12,
  },
  {
    title: "New Customers",
    amount: "+250",
    percentage: "+15%",
    progressValue: 15,
  },
  {
    title: "Returning Customers",
    amount: "+150",
    percentage: "+8%",
    progressValue: 8,
  },
];

const tabs = [
  { value: "orders", label: "Orders" },
  { value: "products", label: "Products" },
  { value: "customers", label: "Customers" },
];

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

const headers = [
  { label: "Transactions ID", className: "" },
  { label: "Customer", className: "hidden sm:table-cell" },
  { label: "Status", className: "hidden sm:table-cell" },
  { label: "Date", className: "hidden md:table-cell" },
  { label: "Amount", className: "text-right" },
];

const rows = [
  [
    { content: <Link href="#">#1234</Link>, className: "font-medium" },
    { content: "Liam Johnson", className: "hidden sm:table-cell" },
    {
      content: <Badge variant="secondary">Fulfilled</Badge>,
      className: "hidden sm:table-cell",
    },
    { content: "2023-06-23", className: "hidden md:table-cell" },
    { content: "$250.00", className: "text-right" },
  ],
  [
    { content: <Link href="#">#1235</Link>, className: "font-medium" },
    { content: "Olivia Smith", className: "hidden sm:table-cell" },
    {
      content: <Badge variant="outline">Declined</Badge>,
      className: "hidden sm:table-cell",
    },
    { content: "", className: "hidden md:table-cell" },
    { content: "$0.00", className: "text-right" },
  ],
];

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

// DataTable Component
const DataTable = ({ headers, rows }) => (
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
      {rows.map((row, index) => (
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

// const CardComponent = ({ className }) => {
//   return (
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//       {data.map((item, index) => (
//         <Card key={index}>
//           <CardHeader className="pb-2">
//             <CardDescription>{item.title}</CardDescription>
//             <CardTitle className="text-4xl">{item.amount}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-xs text-muted-foreground">
//               {item.percentage} from last month
//             </div>
//           </CardContent>
//           <CardFooter>
//             <Progress
//               value={item.progressValue}
//               aria-label={`${item.progressValue}% increase`}
//             />
//           </CardFooter>
//         </Card>
//       ))}
//     </div>
//   );
// };

export default function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

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
    // {
    //   id: 3,
    //   name: "Regel Enterprise",
    //   price: 5550.0,
    //   description: "Regel enterprise plan to scale up",
    //   quantity: "Qty 1 • Billed monthly",
    // },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <div className="grid grid-cols-12 gap-4">
          <CardCTA
            className="col-span-12 lg:col-span-8 mb-4"
            title="Are you getting low on criedt!"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex."
            buttonText="TopUp Now"
            handleButtonClick={() => console.log("Top up Now")}
            modalButton={true}
            pricingPlans={pricingPlans}
          />
          <CardProgress
            title="Your balance"
            amount={CurrencyFormatter(session?.user?.credit, "NGN")}
            percentage="25%"
            progressValue={75}
            Icon={CreditCard}
            iconColor="text-emerald-500"
            className=" mb-4 col-span-12 lg:col-span-4"
          />

          <div className="mb-4 col-span-12 ">
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
                    <DataTable headers={headers} rows={rows} />
                  </CardContent>
                </Card>
              </TabsContent>
            </TabsWrapper>
          </div>
        </div>
      </div>
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
