import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const RecentOrders = ({ className }) => {
  const orders = [
    {
      id: 1,
      total: 678.5,
      status: "Pending",
      createdAt: new Date(Date.now() - 7 * 60 * 1000),
      payment: { type: "PayPal", icon: CreditCard },
    },
    {
      id: 2,
      total: 165.58,
      status: "Shipped",
      createdAt: new Date(Date.now() - 8 * 60 * 1000),
      payment: { type: "Card", icon: CreditCard },
    },
    {
      id: 3,
      total: 463.25,
      status: "Confirmed",
      createdAt: new Date(Date.now() - 9 * 60 * 1000),
      payment: { type: "Skrill", icon: CreditCard },
    },
    {
      id: 4,
      total: 363.25,
      status: "Rejected",
      createdAt: new Date(Date.now() - 10 * 60 * 1000),
      payment: { type: "Visa Card", icon: CreditCard },
    },
  ];

  const tableHeaders = [
    { key: "method", label: "METHOD" },
    { key: "created", label: "CREATED" },
    { key: "total", label: "TOTAL" },
    { key: "status", label: "STATUS" },
  ];

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <Card className={className}>
      <div className="p-6 flex items-center justify-between">
        <p className="text-lg font-medium">Recent Orders</p>

        <Button variant="secondary" size="icon" className="w-8 h-8 rounded-md">
          <MoreHorizontal className="w-4 h-4 text-icon" />
        </Button>
      </div>

      <Table className="mt-3">
        <TableHeader>
          {tableHeaders.map((item) => (
            <TableHead
              key={item.key}
              className={`py-3 px-6 ${item.key === "status" ? "text-end" : ""}`}
            >
              {item.label}
            </TableHead>
          ))}
        </TableHeader>

        <TableBody>
          {orders.map((item) => (
            <TableRow
              key={item.id}
              className="text-sm font-medium border-border text-secondary-foreground"
            >
              <TableCell className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <item.payment.icon size={20} />
                  <div>
                    <p className="font-semibold">{item.id}</p>
                    <p className="text-xs">Paid by {item.payment.type}</p>
                  </div>
                </div>
              </TableCell>

              <TableCell className="px-6 py-5">
                {formatDate(item.createdAt)}
              </TableCell>

              <TableCell className="px-6 py-5">${item.total}</TableCell>

              <TableCell className="px-6 py-5 text-end">
                <span
                  className={cn(
                    "px-1 py-0.5 rounded-sm bg-card text-xs text-icon-active",
                    item.status === "Confirmed"
                      ? "text-emerald-500"
                      : item.status === "Rejected" && "text-red-500"
                  )}
                >
                  {item.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default RecentOrders;
