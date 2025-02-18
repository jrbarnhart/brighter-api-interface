import FeatureForm from "@/components/featureForm/FeatureForm";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import queryKeys from "@/lib/queryKeys";
import { schemas } from "@/schemas/openapi-zod-schemas";
import { components } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";

type MiscItemFormFields = {
  name: string;
  faction: components["schemas"]["FactionsEnum"]["value"];
  element: components["schemas"]["AttackElementsEnum"]["value"];
  isRanged: boolean;
  isTwoHanded: boolean;
};

const MiscItemFormContent = ({
  form,
}: {
  form: UseFormReturn<MiscItemFormFields>;
}) => {
  return (
    <>
      {/* MiscItem Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Misc Item Name" {...field} />
            </FormControl>
            <FormDescription>The name of the misc item.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export function CreateMiscItemForm() {
  const form = useForm<MiscItemFormFields>({
    resolver: zodResolver(schemas.CreateMiscItemDtoSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <FeatureForm<MiscItemFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/items/misc`}
      queryKey={queryKeys.miscItems}
      recordLabel="Misc Item"
    >
      <MiscItemFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateMiscItemForm({
  record,
}: {
  record: components["schemas"]["MiscItemEntity"];
}) {
  const form = useForm<MiscItemFormFields>({
    resolver: zodResolver(schemas.UpdateMiscItemDtoSchema),
    defaultValues: {
      name: record.name,
    },
  });

  return (
    <FeatureForm<MiscItemFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/items/misc`}
      queryKey={queryKeys.miscItems}
      recordLabel="Misc Item"
    >
      <MiscItemFormContent form={form} />
    </FeatureForm>
  );
}
