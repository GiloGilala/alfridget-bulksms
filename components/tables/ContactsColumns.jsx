import { FilePenLine, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import DataTableActions from "./DataTableActions";
import DataTableColumnHeader from "./DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const ContactsColumns = ({ handleEdit, handleDelete }) => [
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
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium capitalize">
          {row.getValue("phone")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span className="capitalize">{row.getValue("email")}</span>
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium capitalize">
          {row.getValue("location")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Country" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span className="capitalize">{row.getValue("country")}</span>
      </div>
    ),
  },
  {
    accessorKey: "groupId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Group" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span className="capitalize">{row.getValue("groupId")}</span>
      </div>
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
          <Link href={`/clients/contacts/${row.original._id}`}>
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
