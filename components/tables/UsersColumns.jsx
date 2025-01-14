"use client";

import DataTableActions from "./DataTableActions";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import DataTableColumnHeader from "./DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FilePenLine, Trash } from "lucide-react";
import { Topup2 } from "../payment/TopUp";
import { CurrencyFormatter } from "@/lib/calculateFn";

const columnStyles = {
  username: "w-[150px] capitalize",
  firstName: "w-[100px] capitalize",
  lastName: "w-[100px] capitalize",
  email: "max-w-[250px] truncate",
  phone: "w-[100px]",
  surname: "w-[100px] capitalize",
  gender: "w-[100px] capitalize",
  createdBy: "w-[100px] capitalize",
  credit: "w-[100px]",
  role: "w-[100px] capitalize",
};

export const UsersColumns = ({ handleEdit, handleDelete }) => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => (
      <div className={columnStyles.username}>{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    cell: ({ row }) => (
      <div className={columnStyles.firstName}>{row.getValue("firstName")}</div>
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    cell: ({ row }) => (
      <div className={columnStyles.lastName}>{row.getValue("lastName")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className={columnStyles.email}>{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => (
      <div className={columnStyles.phone}>{row.getValue("phone")}</div>
    ),
  },
  {
    accessorKey: "surname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Surname" />
    ),
    cell: ({ row }) => (
      <div className={columnStyles.surname}>{row.getValue("surname")}</div>
    ),
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => (
      <div className={columnStyles.gender}>{row.getValue("gender")}</div>
    ),
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By" />
    ),
    cell: ({ row }) => (
      <div className={columnStyles.createdBy}>{row.getValue("createdBy")}</div>
    ),
  },
  {
    accessorKey: "credit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Credit" />
    ),
    cell: ({ row }) => (
      <div className={columnStyles.credit}>
        {" "}
        {CurrencyFormatter(row.getValue("credit"), "NGN")}
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => (
      <div className={columnStyles.role}>{row.getValue("role")}</div>
    ),
  },
  {
    accessorKey: "topup",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Top Up" />
    ),
    cell: ({ row }) => (
      <Topup2 topUpUser={row.original} />
      // <Link href={`/clients/topup/${row.original._id}`}>
      //   {/* <Button size={"xs"}>Top Up</Button> */}
      // </Link>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // const [showEditTaskDialog, setShowEditTaskDialog] = useState(false);
      // const [showDeleteTaskDialog, setShowDeleteTaskDialog] = useState(false);

      return (
        <div className="flex justify-center gap-2">
          {/* <EditTaskDialog
            task={row.original}
            open={showEditTaskDialog}
            onOpenChange={setShowEditTaskDialog}
          /> */}
          {/* <Link href={`/contacts/add?id=${row.original._id}`}> */}
          <Link href={`/adminUsers/${row.original._id}/edit`}>
            <Button
              size={"xs"}
              // onClick={() => handleEdit(row.original)}
              // onClick={() => setShowEditTaskDialog(true)}
            >
              <FilePenLine className=" size-4" />
              {/* Edit */}
            </Button>
          </Link>

          {/* <DeleteTaskDialog
            open={showDeleteTaskDialog}
            onOpenChange={setShowDeleteTaskDialog}
            showTrigger={false}
            onSuccess={() => row.toggleSelected(false)}
            tasks={[row.original]}
          /> */}
          <Button
            size={"xs"}
            variant="destructive"
            onClick={() => handleDelete(row.original._id)}
            // onClick={() => setShowDeleteTaskDialog(true)}
          >
            <Trash className=" size-4" />
            {/* Delete */}
          </Button>
        </div>
      );
    },
  },
];
