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
import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";
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
import { Badge } from "../ui/badge";

type ComboboxData = {
  name?: string;
  index?: number;
  quest?: { name: string };
  id: number;
}[];

export default function ComboboxIds<T extends FieldValues, K extends Path<T>>({
  data,
  fieldName,
  removeFieldName,
  label,
  description,
  form,
}: {
  data: ComboboxData;
  fieldName: K & (PathValue<T, K> extends number[] ? K : never);
  removeFieldName: K & (PathValue<T, K> extends number[] ? K : never);
  label: string;
  description: string;
  form: UseFormReturn<T>;
}) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Set this component's state based on passed id
  const handleSelect = useCallback((id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((prevId) => prevId !== id);
      } else {
        return [id, ...prev];
      }
    });
  }, []);

  // Set state on mount to sync any values the form might already have
  useEffect(() => {
    const formValue: unknown = form.getValues(fieldName);

    if (Array.isArray(formValue)) {
      const filteredVals = formValue.filter((val): val is number | string => {
        if (typeof val === "number") {
          return true;
        } else if (typeof val === "string") {
          const parsed = parseInt(val);
          return !isNaN(parsed);
        }
        return false;
      });

      const parsedVals = filteredVals.map((val) =>
        typeof val === "string" ? parseInt(val) : val
      );
      setSelectedIds(parsedVals);
    }
  }, [fieldName, form]);

  // Update the form value when the state changes if the values are different
  useEffect(() => {
    const formValue: unknown = form.getValues(fieldName);
    const filteredVals = Array.isArray(formValue)
      ? formValue.filter((val) => typeof val === "number")
      : [];
    if (!arraysAreEqual(selectedIds, filteredVals)) {
      form.setValue(fieldName, selectedIds as PathValue<T, Path<T>>);
    }
  }, [fieldName, form, selectedIds]);

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <>
          <Controller
            control={form.control}
            name={removeFieldName}
            render={({ field: removeField }) => (
              <FormItem>
                {/* Type Assertion - BECAUSE REACT HOOK FORM GENERICS HAVE DEFEATED ME.
                    Do not use this component with any form field who's value isn't number[].
                    In a perfect world, TypeScript would infer this correctly. In this world, we assert. */}
                {(field.value as number[]).map((value) => {
                  return (
                    <Badge
                      key={field.value}
                      variant={
                        (removeField.value as number[]).includes(value)
                          ? "destructive"
                          : "default"
                      }
                    >
                      {value}
                    </Badge>
                  );
                })}
              </FormItem>
            )}
          />

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
                      selectedIds.length === 0 && "text-muted-foreground" // Check selectedNames
                    )}
                  >
                    {selectedIds.length > 0
                      ? selectedIds.join(", ") // Display selected names
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
                    <CommandEmpty>Not found.</CommandEmpty>
                    <CommandGroup>
                      {data.map((entry) => (
                        <CommandItem
                          value={`${
                            entry.name
                              ? entry.name
                              : entry.index
                              ? `${
                                  entry.quest?.name || "No Name"
                                } # ${entry.index.toString()}`
                              : "Id: "
                          } - ${entry.id.toString()}`}
                          key={entry.id}
                          onSelect={() => {
                            handleSelect(entry.id);
                          }}
                        >
                          {`${
                            entry.name
                              ? entry.name
                              : entry.index
                              ? `${
                                  entry.quest?.name || "No Name"
                                } # ${entry.index.toString()}`
                              : "Id: "
                          } - ${entry.id.toString()}`}
                          <Check
                            className={cn(
                              "ml-auto",
                              selectedIds.includes(entry.id)
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
        </>
      )}
    />
  );
}
