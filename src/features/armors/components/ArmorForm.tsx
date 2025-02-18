import FeatureForm from "@/components/featureForm/FeatureForm";
import SelectField from "@/components/selectField/SelectField";
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

type ArmorFormFields = {
  name: string;
  faction: components["schemas"]["FactionsEnum"]["value"];
  slot: components["schemas"]["GearSlotsEnum"]["value"];
};

const ArmorFormContent = ({
  form,
}: {
  form: UseFormReturn<ArmorFormFields>;
}) => {
  return (
    <>
      {/* Armor Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Armor Name" {...field} />
            </FormControl>
            <FormDescription>The name of the armor.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Faction */}
      <SelectField
        form={form}
        data={schemas.CreateArmorDtoSchema.shape.faction._def.values}
        fieldName="faction"
        label="Faction"
        description="The faction that uses this armor."
      />
      {/* Element */}
      <SelectField
        form={form}
        data={schemas.CreateArmorDtoSchema.shape.slot._def.values}
        fieldName="slot"
        label="Slot"
        description="The equipment slot this armor goes in."
      />
    </>
  );
};

export function CreateArmorForm() {
  const form = useForm<ArmorFormFields>({
    resolver: zodResolver(schemas.CreateArmorDtoSchema),
    defaultValues: {
      name: "",
      faction: "NONE",
      slot: "HEAD",
    },
  });

  return (
    <FeatureForm<ArmorFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/items/armors`}
      queryKey={queryKeys.armors}
      recordLabel="Armor"
    >
      <ArmorFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateArmorForm({
  record,
}: {
  record: components["schemas"]["ArmorEntity"];
}) {
  const form = useForm<ArmorFormFields>({
    resolver: zodResolver(schemas.UpdateArmorDtoSchema),
    defaultValues: {
      name: record.name,
      faction: record.faction,
      slot: record.slot,
    },
  });

  return (
    <FeatureForm<ArmorFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/items/armors`}
      queryKey={queryKeys.armors}
      recordLabel="Armor"
    >
      <ArmorFormContent form={form} />
    </FeatureForm>
  );
}
