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

type BaseItem = {
  name: string;
};

type ComboboxItem = {
  id: number;
  name?: string;
  description?: string;
  index?: number;
  resource?: BaseItem;
  armor?: BaseItem;
  weapon?: BaseItem;
  monster?: BaseItem;
  quest?: BaseItem;
};

type ComboboxData = ComboboxItem[];

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
  const removeFieldWatch: number[] = useWatch({
    control: form.control,
    name: removeFieldName,
  });
  const fieldWatch: number[] = useWatch({
    control: form.control,
    name: fieldName,
  });

  // Helpers for getting text from entries
  function getBaseName(item: ComboboxItem): string | undefined {
    return (
      item.resource?.name ||
      item.armor?.name ||
      item.weapon?.name ||
      item.quest?.name ||
      item.monster?.name ||
      undefined
    );
  }

  const getDisplayText = (entry: ComboboxItem): string => {
    // Quest Steps
    if (entry.index && entry.description && entry.quest?.name) {
      const tenChars = entry.description.slice(0, 9);
      return `${entry.quest.name} #${entry.index.toString()} - ${tenChars}...`;
    }
    // Variants with base names
    const baseName = getBaseName(entry);
    if (entry.name && baseName) {
      return `${entry.name} ${baseName}`;
    }
    // No base name
    if (entry.name) {
      return entry.name;
    }
    // No name at all
    return `Id: ${entry.id.toString()}`;
  };

  // Set this component's state based on passed id
  const handleCommandSelect = useCallback(
    ({ id, currentValues }: { id: number; currentValues: number[] }) => {
      if (currentValues.includes(id)) {
        // Remove the current value
        const newValues = currentValues.filter((currentId) => currentId !== id);
        form.setValue(fieldName, newValues as PathValue<T, K>);
        if (removeFieldWatch.includes(id)) {
          // Remove the value from removeField value
          const newRemoveValues = removeFieldWatch.filter(
            (currentId) => currentId !== id
          );
          form.setValue(removeFieldName, newRemoveValues as PathValue<T, K>);
        } else if (initialValuesRef.current.includes(id)) {
          // Add the value to removeField value
          form.setValue(removeFieldName, [id, ...removeFieldWatch] as PathValue<
            T,
            K
          >);
        }
      } else {
        // Add the current value
        const newValues = [id, ...currentValues];
        form.setValue(fieldName, newValues as PathValue<T, K>);
        if (removeFieldWatch.includes(id)) {
          // Remove value from removeField values
          const newRemoveValues = removeFieldWatch.filter(
            (currentId) => currentId !== id
          );
          form.setValue(removeFieldName, newRemoveValues as PathValue<T, K>);
        }
      }
    },
    [fieldName, form, removeFieldName, removeFieldWatch]
  );

  const handleBadgeClick = useCallback(
    ({ id, currentValues }: { id: number; currentValues: number[] }) => {
      if (currentValues.includes(id)) {
        // Remove the value from the current removeField value
        const newRemoveValues = currentValues.filter(
          (currentId) => currentId !== id
        );
        form.setValue(removeFieldName, newRemoveValues as PathValue<T, K>);
        if (initialValuesRef.current.includes(id) && !fieldWatch.includes(id)) {
          // Add value back to the field value
          form.setValue(fieldName, [id, ...fieldWatch] as PathValue<T, K>);
        }
      } else {
        // Add the value to the current removeField value
        form.setValue(removeFieldName, [id, ...currentValues] as PathValue<
          T,
          K
        >);
        if (fieldWatch.includes(id)) {
          // Remove the value from field value
          const newValues = fieldWatch.filter((currentId) => currentId !== id);
          form.setValue(fieldName, newValues as PathValue<T, K>);
        }
      }
    },
    [fieldName, fieldWatch, form, removeFieldName]
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
          <div className="space-y-2">
            <FormLabel>{label}</FormLabel>
            <Controller
              control={form.control}
              name={removeFieldName}
              render={({ field: removeField }) => {
                const removeFieldValue = removeField.value as number[];
                return (
                  <FormItem className="flex items-center space-x-2">
                    {/* <p>
                      debug: vals: {fieldValue.join(",")}, removeVals:{" "}
                      {removeFieldValue.join(",")}
                    </p> */}
                    <FormLabel>Current Ids: </FormLabel>

                    <div
                      className="flex items-center gap-2 pl-2"
                      style={{ margin: 0 }}
                    >
                      {initialValuesRef.current.map((value) => {
                        return (
                          <Badge
                            className="cursor-pointer px-3 py-1"
                            key={value}
                            onClick={() => {
                              handleBadgeClick({
                                id: value,
                                currentValues: removeFieldValue,
                              });
                            }}
                            variant={
                              removeFieldValue.includes(value)
                                ? "destructive"
                                : "default"
                            }
                          >
                            {removeFieldValue.includes(value)
                              ? `${value.toString()} - Will be removed`
                              : value}
                          </Badge>
                        );
                      })}
                    </div>
                  </FormItem>
                );
              }}
            />
            <FormItem className="flex flex-col">
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
                            value={getDisplayText(entry)}
                            key={entry.id}
                            onSelect={() => {
                              handleCommandSelect({
                                id: entry.id,
                                currentValues: fieldValue,
                              });
                            }}
                          >
                            {getDisplayText(entry)}
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
          </div>
        );
      }}
    />
  );
}
