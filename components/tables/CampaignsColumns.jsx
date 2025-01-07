"use client";

import DataTableActions from "./DataTableActions";
import { FilePenLine, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import DataTableColumnHeader from "./DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CampaignsColumns = ({ handleEdit, handleDelete }) => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "from",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="From" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium capitalize">
          {row.getValue("from")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span className="capitalize">{row.getValue("type")}</span>
      </div>
    ),
  },
  {
    accessorKey: "message",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Message" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium capitalize">
          {row.getValue("message")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span
          className={cn(
            "capitalize",
            row.getValue("status") === "sent"
              ? "text-green-500"
              : row.getValue("status") === "failed"
              ? "text-red-500"
              : "text-yellow-500"
          )}
        >
          {row.getValue("status")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sent At" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      return (
        <div className="flex w-[100px] items-center">
          <span className="capitalize">{formattedDate}</span>
        </div>
      );
    },
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
          <Link href={`/clients/sms/${row.original._id}`}>
            <Button
              size={"xs"}
              variant="outline"
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
