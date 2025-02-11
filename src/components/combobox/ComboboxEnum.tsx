import { arraysAreEqual, cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useCallback, useEffect, useState } from "react";

export default function ComboboxEnum<T extends FieldValues>({
  data,
  fieldName,
  label,
  description,
  form,
}: {
  data: string[];
  fieldName: Path<T>;
  label: string;
  description: string;
  form: UseFormReturn<T>;
}) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // Remove the value if it is included or add it if not
  const handleSelect = useCallback((value: string) => {
    setSelectedValues((prev) => {
      if (prev.includes(value)) {
        return prev.filter((prevValue) => prevValue !== value);
      } else {
        return [value, ...prev];
      }
    });
  }, []);

  // Set state on mount to sync any values the form might already have
  useEffect(() => {
    const formValue: unknown = form.getValues(fieldName);

    if (Array.isArray(formValue)) {
      const filteredVals = formValue.filter((val) => typeof val === "string");
      setSelectedValues(filteredVals);
    }
  }, [fieldName, form]);

  // Update the form value when the state changes if the values are different
  useEffect(() => {
    const formValue: unknown = form.getValues(fieldName);
    const filteredVals = Array.isArray(formValue)
      ? formValue.filter((val) => typeof val === "string")
      : [];
    if (!arraysAreEqual(selectedValues, filteredVals)) {
      form.setValue(fieldName, selectedValues as PathValue<T, Path<T>>);
    }
  }, [fieldName, form, selectedValues]);

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={() => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-60 truncate justify-between",
                    selectedValues.length === 0 && "text-muted-foreground"
                  )}
                >
                  {selectedValues.length > 0
                    ? selectedValues.join(", ")
                    : `Select ${label}`}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {data.map((entry) => (
                      <CommandItem
                        value={entry}
                        key={entry}
                        onSelect={() => {
                          handleSelect(entry);
                        }}
                      >
                        {entry}
                        <Check
                          className={cn(
                            "ml-auto",
                            selectedValues.includes(entry)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
