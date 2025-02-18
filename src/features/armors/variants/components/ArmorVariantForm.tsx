import ComboboxSingleIdId from "@/components/combobox/ComboboxSingleId";
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

type ArmorVariantFormFetchedData = {
  armors: Data<
    paths["/items/armors"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
};

type ArmorVariantFormFields = {
  name: string;
  armorId: number;
};

const ArmorVariantFormContent = ({
  form,
}: {
  form: UseFormReturn<ArmorVariantFormFields>;
}) => {
  const { isLoading, isSuccess, error, data } =
    useQuery<ArmorVariantFormFetchedData>({
      queryKey: [queryKeys.armorVariantForm],
      queryFn: async (): Promise<ArmorVariantFormFetchedData> => {
        try {
          const armorsResponse = await axiosClient.get<
            Data<
              paths["/items/armors"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/items/armors");
          return { armors: armorsResponse.data };
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
  const { armors } = data;

  return (
    <>
      {/* ArmorVariant Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Armor Variant Name" {...field} />
            </FormControl>
            <FormDescription>The name of the variant.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Armor Id */}
      <ComboboxSingleIdId
        form={form}
        data={armors.data}
        fieldName="armorId"
        label="Armor"
        description="Id of the armor this is a variant of."
      />
    </>
  );
};

export function CreateArmorVariantForm() {
  const form = useForm<ArmorVariantFormFields>({
    resolver: zodResolver(schemas.CreateArmorVariantDtoSchema),
    defaultValues: {
      name: "",
      armorId: 0,
    },
  });

  return (
    <FeatureForm<ArmorVariantFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/items/armors/variants`}
      queryKey={queryKeys.armorVariants}
      recordLabel="Armor Variant"
    >
      <ArmorVariantFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateArmorVariantForm({
  record,
}: {
  record: components["schemas"]["ArmorVariantEntity"];
}) {
  const form = useForm<ArmorVariantFormFields>({
    resolver: zodResolver(schemas.UpdateArmorVariantDtoSchema),
    defaultValues: {
      name: record.name,
      armorId: record.armorId,
    },
  });

  return (
    <FeatureForm<ArmorVariantFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/items/armors/variants`}
      queryKey={queryKeys.armorVariants}
      recordLabel="Armor Variant"
    >
      <ArmorVariantFormContent form={form} />
    </FeatureForm>
  );
}
