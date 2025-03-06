import ComboboxSingleId from "@/components/combobox/ComboboxSingleId";
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
import { axiosClient } from "@/queries/axiosClient";
import { schemas } from "@/schemas/openapi-zod-schemas";
import { components, paths } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

type WeaponVariantFormFetchedData = {
  weapons: Data<
    paths["/items/weapons"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
};

type WeaponVariantFormFields = {
  name: string;
  weaponId: number;
};

const WeaponVariantFormContent = ({
  form,
}: {
  form: UseFormReturn<WeaponVariantFormFields>;
}) => {
  const { isLoading, isSuccess, error, data } =
    useQuery<WeaponVariantFormFetchedData>({
      queryKey: [queryKeys.weaponVariantForm],
      queryFn: async (): Promise<WeaponVariantFormFetchedData> => {
        try {
          const weaponsResponse = await axiosClient.get<
            Data<
              paths["/items/weapons"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/items/weapons");
          return { weapons: weaponsResponse.data };
        } catch (error) {
          if (axios.isAxiosError(error)) {
            throw new Error(error.message);
          } else {
            console.error(error);
            throw new Error(
              "An unexpected error occurred while fetching data for form."
            );
          }
        }
      },
    });

  // Reset the form after data is fetched so defaults show up
  useEffect(() => {
    if (isSuccess) {
      form.reset();
    }
  }, [form, isSuccess]);

  // Render skeleton/error here
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!isSuccess) {
    return (
      <div>
        <p>There was a problem fetching the data.</p>
      </div>
    );
  }

  // Render the form
  const { weapons } = data;

  return (
    <>
      {/* Weapon Variant Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Weapon Variant Name" {...field} />
            </FormControl>
            <FormDescription>The name of the variant.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Weapon Id */}
      <ComboboxSingleId
        form={form}
        data={weapons.data}
        fieldName="weaponId"
        label="Weapon"
        description="Id of the weapon this is a variant of."
      />
    </>
  );
};

export function CreateWeaponVariantForm() {
  const form = useForm<WeaponVariantFormFields>({
    resolver: zodResolver(schemas.CreateWeaponVariantDtoSchema),
    defaultValues: {
      name: "",
      weaponId: 0,
    },
  });

  return (
    <FeatureForm<WeaponVariantFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/items/weapons/variants`}
      queryKey={queryKeys.weaponVariants}
      recordLabel="Weapon Variant"
    >
      <WeaponVariantFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateWeaponVariantForm({
  record,
}: {
  record: components["schemas"]["WeaponVariantEntity"];
}) {
  const form = useForm<WeaponVariantFormFields>({
    resolver: zodResolver(schemas.UpdateWeaponVariantDtoSchema),
    defaultValues: {
      name: record.name,
      weaponId: record.weaponId,
    },
  });

  return (
    <FeatureForm<WeaponVariantFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/items/weapons/variants`}
      queryKey={queryKeys.weaponVariants}
      recordLabel="Weapon Variant"
    >
      <WeaponVariantFormContent form={form} />
    </FeatureForm>
  );
}
