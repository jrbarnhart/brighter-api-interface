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

type ConsumableVariantFormFetchedData = {
  consumables: Data<
    paths["/items/consumables"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
};

type ConsumableVariantFormFields = {
  name: string;
  consumableId: number;
};

const ConsumableVariantFormContent = ({
  form,
}: {
  form: UseFormReturn<ConsumableVariantFormFields>;
}) => {
  const { isLoading, isSuccess, error, data } =
    useQuery<ConsumableVariantFormFetchedData>({
      queryKey: [queryKeys.consumableVariantForm],
      queryFn: async (): Promise<ConsumableVariantFormFetchedData> => {
        try {
          const consumablesResponse = await axiosClient.get<
            Data<
              paths["/items/consumables"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/items/consumables");
          return { consumables: consumablesResponse.data };
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
  const { consumables } = data;

  return (
    <>
      {/* Consumable Variant Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Variant Name" {...field} />
            </FormControl>
            <FormDescription>The name of the variant.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Skill Id */}
      <ComboboxSingleId
        form={form}
        data={consumables.data}
        description="Id of the consumable this is a variant of."
        fieldName="consumableId"
        label="Consumable"
      />
    </>
  );
};

export function CreateConsumableVariantForm() {
  const form = useForm<ConsumableVariantFormFields>({
    resolver: zodResolver(schemas.CreateConsumableVariantDtoSchema),
    defaultValues: {
      name: "",
      consumableId: 0,
    },
  });

  return (
    <FeatureForm<ConsumableVariantFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/items/consumables/variants`}
      queryKey={queryKeys.consumableVariants}
      recordLabel="Consumable Variant"
    >
      <ConsumableVariantFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateConsumableVariantForm({
  record,
}: {
  record: components["schemas"]["ConsumableVariantEntity"];
}) {
  const form = useForm<ConsumableVariantFormFields>({
    resolver: zodResolver(schemas.UpdateConsumableVariantDtoSchema),
    defaultValues: {
      name: record.name,
      consumableId: record.consumableId,
    },
  });

  return (
    <FeatureForm<ConsumableVariantFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/items/consumables/variants`}
      queryKey={queryKeys.consumableVariants}
      recordLabel="Consumable Variant"
    >
      <ConsumableVariantFormContent form={form} />
    </FeatureForm>
  );
}
