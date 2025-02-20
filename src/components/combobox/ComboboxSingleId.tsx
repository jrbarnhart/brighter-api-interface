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
import { useCallback, useState } from "react";

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
  nullable = false,
}: {
  data: ComboboxData;
  fieldName: Path<T>;
  label: string;
  description: string;
  form: UseFormReturn<T>;
  nullable?: boolean;
}) {
  // Set this component's state based on passed id
  const handleCommandSelect = useCallback(
    ({
      id,
      currentValue: currentValues,
      name,
    }: {
      id: number;
      currentValue: number;
      name?: string;
    }) => {
      if (currentValues === id) {
        // Remove the current value
        form.setValue(fieldName, null as PathValue<T, Path<T>>);
        setButtonContent(null);
      } else {
        // Add the current value
        form.setValue(fieldName, id as PathValue<T, Path<T>>);
        const newButtonContent = name
          ? `${id.toString()} - ${name}`
          : `Id - ${id.toString()}`;
        setButtonContent(newButtonContent);
      }
    },
    [fieldName, form]
  );

  const [buttonContent, setButtonContent] = useState<string | null>(null);

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
                        !fieldValue && "text-muted-foreground"
                      )}
                    >
                      {buttonContent ? buttonContent : `Select ${label}`}
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
                      <CommandEmpty>No options found.</CommandEmpty>
                      <CommandGroup>
                        {nullable && field.value !== null && (
                          <CommandItem
                            onSelect={() => {
                              field.onChange(null);
                            }}
                            className="text-destructive"
                          >
                            Remove selection
                          </CommandItem>
                        )}
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
                                name: entry.name,
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
