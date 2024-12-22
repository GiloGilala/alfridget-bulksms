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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const TopSeller = ({ className }) => {
  const sellers = [
    {
      id: 1,
      totalSold: 13440,
      totalAmount: 350000,
      country: "/user1.png",
      user: {
        name: "Gage Paquette",
        image: "/user1.png",
      },
    },
    {
      id: 2,
      totalSold: 10240,
      totalAmount: 148000,
      country: "/user1.png",
      user: {
        name: "Lara Harvey",
        image: "/user1.png",
      },
    },
    {
      id: 3,
      totalSold: 10240,
      totalAmount: 148000,
      country: "/user1.png",
      user: { name: "Evan Scott", image: "/user1.png" },
    },
    {
      id: 4,
      totalSold: 10240,
      totalAmount: 148000,
      country: "/user1.png",
      user: {
        name: "Benja Johnston",
        image: "/user1.png",
      },
    },
  ];

  return (
    <Card className={className}>
      <div className="p-6 flex items-center justify-between">
        <p className="text-lg font-medium">Customer Transactions</p>

        <Button variant="secondary" size="icon" className="w-8 h-8 rounded-md">
          <MoreHorizontal className="w-4 h-4 text-icon" />
        </Button>
      </div>

      <Table className="mt-3">
        <TableHeader>
          <TableRow className="text-sm font-medium border-none text-secondary-foreground">
            <TableHead className="py-3 px-6">Profile</TableHead>
            <TableHead className="py-3 px-6 text-end">Item Sold</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sellers.map((item) => (
            <TableRow
              key={item.id}
              className="text-sm font-medium border-none text-secondary-foreground"
            >
              <TableCell className="px-6 py-5 ">
                <div className="flex items-center gap-3">
                  <Avatar className="w-9 h-9">
                    <AvatarImage src={item.user.image} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs">{item.id}</p>
                    <p className="font-semibold">{item.user.name}</p>
                  </div>
                </div>
              </TableCell>

              <TableCell className="px-6 py-5 text-end">
                {item.totalSold}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default TopSeller;
