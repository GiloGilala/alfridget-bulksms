import DataTableActions from "./DataTableActions";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import DataTableColumnHeader from "./DataTableColumnHeader";

export const columns = [
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
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] capitalize">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "userId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User ID" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium capitalize">
          {row.getValue("userId")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "clientId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client ID" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium capitalize">
          {row.getValue("clientId")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "transactionType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction Type" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span className="capitalize">{row.getValue("transactionType")}</span>
      </div>
    ),
  },
  {
    accessorKey: "transID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction Reference" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium capitalize">
          {row.getValue("transID")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "transTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction Time" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span>{new Date(row.getValue("transTime")).toLocaleString()}</span>
      </div>
    ),
  },
  {
    accessorKey: "transAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction Amount" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span>${row.getValue("transAmount").toFixed(2)}</span>
      </div>
    ),
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span
          className={cn(
            "capitalize",
            row.getValue("isActive") ? "text-green-500" : "text-red-500"
          )}
        >
          {row.getValue("isActive") ? "Yes" : "No"}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableActions row={row} />,
  },
];
