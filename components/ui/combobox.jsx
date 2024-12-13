import React, { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
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

export const Combobox = ({
  items,
  selectedValues = [],
  onChange,
  placeholder = "Select...",
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [value, setValue] = useState(selectedValues);

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const handleSetValue = (val) => {
    const newValue = value.includes(val)
      ? value.filter((item) => item !== val)
      : [...value, val];
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleSelectAll = () => {
    const allValues = items.map((item) => item.value);
    setValue(allValues);
    onChange(allValues);
  };

  const handleDeselectAll = () => {
    setValue([]);
    onChange([]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-controls="combobox-list"
          className="w-full  justify-between"
        >
          <div className="flex gap-2 flex-wrap justify-start">
            {value.length > 0 ? (
              value.map((val, i) => (
                <div
                  key={i}
                  onClick={(e) => handleSetValue(val)}
                  className="flex items-center gap-1 px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium cursor-pointer"
                >
                  {items.find((item) => item.value === val)?.label}
                  <X className="text-xs cursor-pointer text-red-500" />
                </div>
              ))
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent id="combobox-list" className="w-full max-w-[480px] p-0">
        <Command>
          <CommandInput
            placeholder="Search..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            {filteredItems.length > 0 ? (
              <CommandGroup>
                {filteredItems.map((item) => (
                  <CommandItem
                    key={item.value}
                    onSelect={() => handleSetValue(item.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.includes(item.value) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandEmpty>No items found.</CommandEmpty>
            )}
          </CommandList>
        </Command>
        <div className="flex justify-between mt-2">
          <Button
            variant="outline"
            className="w-[100px] text-sm"
            onClick={handleSelectAll}
          >
            Select All
          </Button>
          <Button
            variant="outline"
            className="w-[100px] text-sm"
            onClick={handleDeselectAll}
          >
            Deselect All
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
