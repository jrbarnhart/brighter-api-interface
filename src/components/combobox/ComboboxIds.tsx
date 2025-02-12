import { cn } from "@/lib/utils";
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
  useWatch,
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
import { useCallback, useEffect, useRef } from "react";
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
  fieldName: K;
  removeFieldName: K;
  label: string;
  description: string;
  form: UseFormReturn<T>;
}) {
  const initialValuesRef = useRef<number[]>([]);
  const removeFieldValues: number[] = useWatch({
    control: form.control,
    name: removeFieldName,
  });

  // Set this component's state based on passed id
  const handleSelect = useCallback(
    ({ id, currentValues }: { id: number; currentValues: number[] }) => {
      if (currentValues.includes(id)) {
        // Remove the current value
        const newValues = currentValues.filter((currentId) => currentId !== id);
        form.setValue(fieldName, newValues as PathValue<T, K>);
        if (removeFieldValues.includes(id)) {
          // Remove the value from removeField value
          const newRemoveValues = removeFieldValues.filter(
            (currentId) => currentId !== id
          );
          form.setValue(removeFieldName, newRemoveValues as PathValue<T, K>);
        } else {
          // Add the value to removeField value
          form.setValue(removeFieldName, [
            id,
            ...removeFieldValues,
          ] as PathValue<T, K>);
        }
      } else {
        // Add the current value
        const newValues = [id, ...currentValues];
        form.setValue(fieldName, newValues as PathValue<T, K>);
        if (removeFieldValues.includes(id)) {
          // Remove value from removeField values
          const newRemoveValues = removeFieldValues.filter(
            (currentId) => currentId !== id
          );
          form.setValue(removeFieldName, newRemoveValues as PathValue<T, K>);
        }
      }
    },
    [fieldName, form, removeFieldName, removeFieldValues]
  );

  // Sets the initial values ref once
  useEffect(() => {
    if (initialValuesRef.current.length === 0) {
      initialValuesRef.current = form.getValues(fieldName);
    }
  }, [fieldName, form]);

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => {
        {
          /* Type Assertion due to the expected type from react hook form.
             Do not use this component with any form field who's value isn't number[]. */
        }
        const fieldValue = field.value as number[];
        return (
          <>
            <Controller
              control={form.control}
              name={removeFieldName}
              render={({ field: removeField }) => {
                const removeFieldValue = removeField.value as number[];
                return (
                  <FormItem>
                    {initialValuesRef.current.map((value) => {
                      return (
                        <Badge
                          key={value}
                          variant={
                            removeFieldValue.includes(value)
                              ? "destructive"
                              : "default"
                          }
                        >
                          {value}
                        </Badge>
                      );
                    })}
                  </FormItem>
                );
              }}
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
                        fieldValue.length === 0 && "text-muted-foreground"
                      )}
                    >
                      {fieldValue.length > 0
                        ? fieldValue.join(", ")
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
                              handleSelect({
                                id: entry.id,
                                currentValues: fieldValue,
                              });
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
                                fieldValue.includes(entry.id)
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
        );
      }}
    />
  );
}
