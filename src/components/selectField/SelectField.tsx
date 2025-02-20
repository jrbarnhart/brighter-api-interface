import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";

export default function SelectField<T extends FieldValues>({
  data,
  form,
  fieldName,
  label,
  description,
  valueType = "string",
}: {
  data: string[] | { name: string; id: number }[];
  form: UseFormReturn<T>;
  fieldName: Path<T>;
  label: string;
  description: string;
  valueType?: "string" | "number";
}) {
  const normalizedData = data.map((d) =>
    typeof d === "string" ? { name: d, id: d } : d
  );

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={(value) => {
              const newValue = valueType === "number" ? Number(value) : value;
              form.setValue(fieldName, newValue as PathValue<T, Path<T>>);
            }}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue>
                  {field.value === 0
                    ? "Select a skill"
                    : normalizedData.find((r) => r.id === field.value)?.name}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {normalizedData.map((d, index) => (
                <SelectItem value={d.id.toString()} key={index}>
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
