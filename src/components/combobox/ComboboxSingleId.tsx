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
import { useCallback } from "react";

type ComboboxData = {
  name?: string;
  index?: number;
  quest?: { name: string };
  id: number;
}[];

export default function ComboboxSingleIdId<T extends FieldValues>({
  data,
  fieldName,
  label,
  description,
  form,
}: {
  data: ComboboxData;
  fieldName: Path<T>;
  label: string;
  description: string;
  form: UseFormReturn<T>;
}) {
  // Set this component's state based on passed id
  const handleCommandSelect = useCallback(
    ({
      id,
      currentValue: currentValues,
    }: {
      id: number;
      currentValue: number;
    }) => {
      if (currentValues === id) {
        // Remove the current value
        form.setValue(fieldName, null as PathValue<T, Path<T>>);
      } else {
        // Add the current value
        form.setValue(fieldName, id as PathValue<T, Path<T>>);
      }
    },
    [fieldName, form]
  );

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => {
        {
          /* Type Assertion due to the expected type from react hook form.
             Do not use this component with any form field who's value isn't number. */
        }
        const fieldValue = field.value as number;
        return (
          <div className="space-y-2">
            <FormLabel>{label}</FormLabel>
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-60 truncate justify-between",
                        fieldValue && "text-muted-foreground"
                      )}
                    >
                      {fieldValue ? fieldValue : `Select ${label}`}
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
                              handleCommandSelect({
                                id: entry.id,
                                currentValue: fieldValue,
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
                                fieldValue === entry.id
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
          </div>
        );
      }}
    />
  );
}
