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

type ResourceVariantFormFetchedData = {
  resources: paths["/items/resources"]["get"]["responses"]["200"]["content"]["application/json"];
};

type ResourceVariantFormFields = {
  name: string;
  resourceId: number;
};

const ResourceVariantFormContent = ({
  form,
}: {
  form: UseFormReturn<ResourceVariantFormFields>;
}) => {
  const { isLoading, isSuccess, error, data } =
    useQuery<ResourceVariantFormFetchedData>({
      queryKey: [queryKeys.resourceVariantForm],
      queryFn: async (): Promise<ResourceVariantFormFetchedData> => {
        try {
          const resourcesResponse = await axiosClient.get<
            paths["/items/resources"]["get"]["responses"]["200"]["content"]["application/json"]
          >("/items/resources");
          return { resources: resourcesResponse.data };
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
  const { resources } = data;

  return (
    <>
      {/* Resource Variant Name */}
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
      {/* Resource Id */}
      <ComboboxSingleId
        form={form}
        data={resources}
        fieldName="resourceId"
        description="Resource this is a variant of."
        label="Resource Id"
      />
    </>
  );
};

export function CreateResourceVariantForm() {
  const form = useForm<ResourceVariantFormFields>({
    resolver: zodResolver(schemas.CreateResourceVariantDtoSchema),
    defaultValues: {
      name: "",
      resourceId: 0,
    },
  });

  return (
    <FeatureForm<ResourceVariantFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/items/resources/variants`}
      queryKey={queryKeys.resourceVariants}
      recordLabel="Resource Variant"
    >
      <ResourceVariantFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateResourceVariantForm({
  record,
}: {
  record: components["schemas"]["ResourceVariantEntity"];
}) {
  const form = useForm<ResourceVariantFormFields>({
    resolver: zodResolver(schemas.UpdateResourceVariantDtoSchema),
    defaultValues: {
      name: record.name,
      resourceId: record.resourceId,
    },
  });

  return (
    <FeatureForm<ResourceVariantFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/items/resources/variants`}
      queryKey={queryKeys.resourceVariants}
      recordLabel="Resource Variant"
    >
      <ResourceVariantFormContent form={form} />
    </FeatureForm>
  );
}
