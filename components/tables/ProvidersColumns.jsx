import DataTableActions from "./DataTableActions";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import DataTableColumnHeader from "./DataTableColumnHeader";

export const ProvidersColumns = [
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
    accessorKey: "providerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Provider Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("providerName")}</div>
    ),
  },
  {
    accessorKey: "hostName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Host Name" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium capitalize">
          {row.getValue("hostName")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "providerType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Provider Type" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span className="capitalize">{row.getValue("providerType")}</span>
      </div>
    ),
  },
  {
    accessorKey: "credits",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Credits" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium capitalize">
          {row.getValue("credits")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "apiKey",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="API Key" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span className="capitalize">{row.getValue("apiKey")}</span>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableActions row={row} />,
  },
];
