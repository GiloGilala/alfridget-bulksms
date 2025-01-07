"use client";

import DataTableActions from "./DataTableActions";
import { FilePenLine, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import DataTableColumnHeader from "./DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const GroupContactColumns = ({ handleEdit, handleDelete }) => [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium capitalize">
          {row.getValue("description")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "contactIds",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contacts" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium capitalize">
          {row.getValue("contactIds").length} Contacts
        </span>
      </div>
    ),
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span
          className={cn(
            "capitalize",
            row.getValue("isActive") ? "text-green-500" : "text-red-500"
          )}
        >
          {row.getValue("isActive") ? "Active" : "Inactive"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
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
          <Link href={`/clients/contacts/groups/${row.original._id}`}>
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
