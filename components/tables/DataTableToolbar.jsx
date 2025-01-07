import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTableFilter from "./DataTableFilter";
import { useState } from "react";
import { TrashIcon } from "lucide-react";
import { incomeType, categories } from "./data";
import { CalendarDatePicker } from "../CalendarDatePicker";
import DataTableViewOptions from "./DataTableViewOptions";

function DataTableToolbar({ table, tableFilterOptions, tableFilterTitle }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const handleDateSelect = ({ from, to }) => {
    setDateRange({ from, to });
    table.getColumn("date")?.setFilterValue([from, to]);
  };

  const selecetedIds = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original);
  console.log("seleceted Ids :", selecetedIds);

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {/* <Input
          placeholder="Filter labels..."
          value={table.getColumn("note")?.getFilterValue() ?? ""}
          onChange={(event) => {
            table.getColumn("note")?.setFilterValue(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        /> */}

        {tableFilterTitle?.group === "Group" && (
          <>
            {table.getColumn("name") && (
              <Input
                placeholder="Filter labels..."
                value={table.getColumn("name")?.getFilterValue() ?? ""}
                onChange={(event) => {
                  table.getColumn("name")?.setFilterValue(event.target.value);
                }}
                className="h-8 w-[150px] lg:w-[250px]"
              />
            )}

            {table.getColumn("name") && (
              <DataTableFilter
                column={table.getColumn("name")}
                title="name"
                options={tableFilterOptions}
              />
            )}
          </>
        )}
        {tableFilterTitle?.user === "User" && (
          <>
            {table.getColumn("username") && (
              <Input
                placeholder="Filter labels..."
                value={table.getColumn("username")?.getFilterValue() ?? ""}
                onChange={(event) => {
                  table
                    .getColumn("username")
                    ?.setFilterValue(event.target.value);
                }}
                className="h-8 w-[150px] lg:w-[250px]"
              />
            )}

            {table.getColumn("isActive") && (
              <DataTableFilter
                column={table.getColumn("isActive")}
                title="Active"
                options={tableFilterOptions}
              />
            )}
            {table.getColumn("role") && (
              <DataTableFilter
                column={table.getColumn("role")}
                title="Role"
                options={tableFilterOptions}
              />
            )}
          </>
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        <CalendarDatePicker
          date={dateRange}
          onDateSelect={handleDateSelect}
          className="h-9 w-[250px]"
          variant="outline"
        />
      </div>

      <div className="flex items-center gap-2">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete ({table.getFilteredSelectedRowModel().rows.length})
          </Button>
        ) : null}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}

export default DataTableToolbar;
