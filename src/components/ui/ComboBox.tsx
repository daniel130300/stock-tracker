"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { FixedSizeList as List } from "react-window";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Button } from "./Button";
import { FormControl } from "./Form";

interface Option {
  value: string;
  label: string;
}

interface ComboBoxProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onSelect"> {
  options: Option[];
  label?: string;
  initialValue?: string;
  onSelect?: (value: string) => void;
}

export function ComboBox({ options, initialValue, onSelect, ...props }: ComboBoxProps) {
  const [value, setValue] = React.useState(initialValue);
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const ITEM_HEIGHT = 32;

  // Filter options based on the search query
  const filteredOptions = searchQuery
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[200px] justify-between",
              !value && "text-muted-foreground"
            )}
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : "Select option"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search option..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            {filteredOptions.length > 0 ? (
              <CommandGroup>
                <List
                  height={Math.min(ITEM_HEIGHT * 5, filteredOptions.length * ITEM_HEIGHT)}
                  itemCount={filteredOptions.length}
                  itemSize={ITEM_HEIGHT}
                  width={200}
                >
                  {({ index, style }) => {
                    const option = filteredOptions[index];
                    return (
                      <CommandItem
                        value={option.label}
                        key={option.value}
                        onSelect={() => {
                          onSelect?.(option.value);
                          setValue(option.value);
                          setOpen(false);
                          setSearchQuery("");
                        }}
                        style={style}
                      >
                        {option.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            option.value === value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    );
                  }}
                </List>
              </CommandGroup>
            ) : (
              <CommandEmpty>No option found.</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
