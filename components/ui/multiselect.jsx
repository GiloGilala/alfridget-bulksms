"use client";

import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const contactOptions = [
  { value: "1", label: "John Doe" },
  { value: "2", label: "Jane Smith" },
];

export const Combobox = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [value, setValue] = useState([]);
  const [filteredItems, setFilteredItems] = useState(contactOptions);

  const handleSetValue = (val) => {
    setValue([...value, val]);
  };

  const handleDeselectValue = (val) => {
    setValue(value.filter((item) => item !== val));
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = contactOptions.filter((item) =>
      item.label.toLowerCase().includes(query.trim().toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredItems(contactOptions);
  };

  const handleSelectAll = () => {
    const allValues = filteredItems.map((item) => item.value);
    setValue(allValues);
  };

  const handleDeselectAll = () => {
    setValue([]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[480px] justify-between"
        >
          <div className="flex gap-2 justify-start">
            {value.length
              ? value.map((val, i) => (
                  <div
                    key={i}
                    className="px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium"
                  >
                    {contactOptions.find((item) => item.value === val)?.label}
                    <button
                      className="ml-2 text-xs font-medium text-red-500"
                      onClick={() => handleDeselectValue(val)}
                    >
                      X
                    </button>
                  </div>
                ))
              : "Select..."}
          </div>
          <Button onClick={() => setOpen(!open)}>Toggle</Button>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[480px] p-0">
        <div className="flex justify-between mb-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button
            className="text-xs font-medium text-blue-500"
            onClick={handleClearSearch}
          >
            Clear
          </button>
        </div>
        <ul>
          {filteredItems.map((item) => (
            <li key={item.value}>
              <button
                className="w-full text-left py-2 hover:bg-slate-100"
                onClick={() => handleSetValue(item.value)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-2">
          <button
            className="text-xs font-medium text-blue-500"
            onClick={handleSelectAll}
          >
            Select All
          </button>
          <button
            className="text-xs font-medium text-blue-500"
            onClick={handleDeselectAll}
          >
            Deselect All
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
