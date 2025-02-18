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
import { Switch } from "@/components/ui/switch";
import queryKeys from "@/lib/queryKeys";
import { schemas } from "@/schemas/openapi-zod-schemas";
import { components } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";

type WeaponFormFields = {
  name: string;
  faction: components["schemas"]["FactionsEnum"]["value"];
  element: components["schemas"]["AttackElementsEnum"]["value"];
  isRanged: boolean;
  isTwoHanded: boolean;
};

const WeaponFormContent = ({
  form,
}: {
  form: UseFormReturn<WeaponFormFields>;
}) => {
  return (
    <>
      {/* Weapon Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Weapon Name" {...field} />
            </FormControl>
            <FormDescription>The name of the weapon.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Faction */}
      <SelectField
        form={form}
        data={schemas.CreateWeaponDtoSchema.shape.faction._def.values}
        fieldName="faction"
        label="Faction"
        description="The faction that uses this weapon."
      />
      {/* Element */}
      <SelectField
        form={form}
        data={schemas.CreateWeaponDtoSchema.shape.element._def.values}
        fieldName="element"
        label="Element"
        description="The element this weapon attacks with."
      />
      {/* Is Ranged */}
      <FormField
        control={form.control}
        name="isRanged"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Is Ranged:</FormLabel>
            <FormControl>
              <div className="w-full">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  defaultChecked={field.value}
                />
              </div>
            </FormControl>
            <FormDescription>Is this a ranged weapon?</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Is Two Handed */}
      <FormField
        control={form.control}
        name="isTwoHanded"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Is Two-Handed:</FormLabel>
            <FormControl>
              <div className="w-full">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  defaultChecked={field.value}
                />
              </div>
            </FormControl>
            <FormDescription>Is this a two-handed weapon?</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export function CreateWeaponForm() {
  const form = useForm<WeaponFormFields>({
    resolver: zodResolver(schemas.CreateWeaponDtoSchema),
    defaultValues: {
      name: "",
      element: "NONE",
      faction: "NONE",
      isRanged: false,
      isTwoHanded: false,
    },
  });

  return (
    <FeatureForm<WeaponFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/items/weapons`}
      queryKey={queryKeys.weapons}
      recordLabel="Weapon"
    >
      <WeaponFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateWeaponForm({
  record,
}: {
  record: components["schemas"]["WeaponEntity"];
}) {
  const form = useForm<WeaponFormFields>({
    resolver: zodResolver(schemas.UpdateWeaponDtoSchema),
    defaultValues: {
      name: record.name,
      element: record.element,
      faction: record.faction,
      isRanged: record.isRanged,
      isTwoHanded: record.isTwoHanded,
    },
  });

  return (
    <FeatureForm<WeaponFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/items/weapons`}
      queryKey={queryKeys.weapons}
      recordLabel="Weapon"
    >
      <WeaponFormContent form={form} />
    </FeatureForm>
  );
}
