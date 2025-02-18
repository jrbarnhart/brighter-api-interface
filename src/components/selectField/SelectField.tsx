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
}: {
  data: string[] | { name: string; id: number }[];
  form: UseFormReturn<T>;
  fieldName: Path<T>;
  label: string;
  description: string;
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
              form.setValue(fieldName, value as PathValue<T, Path<T>>, {
                shouldValidate: true,
              });
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={`Select a ${label}`} />
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
