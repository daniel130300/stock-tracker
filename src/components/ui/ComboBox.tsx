"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { FixedSizeList as List } from "react-window"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"
import { Button } from "./Button"
import { FormControl } from "./Form"

interface Option {
  value: string;
  label: string;
}

interface ComboBoxProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onSelect'>  {
  options: Option[];
  label?: string;
  initialValue?: string;
  onSelect?: (value: string) => void;
}

export function ComboBox({ options, initialValue, onSelect, ...props }: ComboBoxProps) {
  const [value, setValue] = React.useState(initialValue);

  // Adjust the item height to suit your design
  const ITEM_HEIGHT = 32;
  const totalOptions = options.length;

  return (
    <Popover {...props}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "justify-between",
              !value && "text-muted-foreground"
            )}
          >
            {value
              ? options.find(
                  (option) => option.value === value
                )?.label
              : "Select option"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search option..." />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              <List
                height={Math.min(ITEM_HEIGHT * 5, totalOptions * ITEM_HEIGHT)}  // Render a maximum of 5 items
                itemCount={totalOptions}
                itemSize={ITEM_HEIGHT}
                width={40000}
              >
                {({ index, style }) => {
                  const option = options[index];
                  return (
                    <CommandItem
                      value={option.label}
                      key={option.value}
                      onSelect={() => {
                        onSelect?.(option.value)
                        setValue(option.value)
                      }}
                      style={style}
                    >
                      {option.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          option.value === value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                }}
              </List>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}