import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FeatureForm from "@/components/featureForm/FeatureForm";
import { schemas } from "../../../schemas/openapi-zod-schemas";

const RegionFormContent = ({ form }: { form: UseFormReturn }) => {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="Region Name" {...field} />
          </FormControl>
          <FormDescription>The name of the region.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export function CreateRegionForm() {
  return (
    <FeatureForm<typeof schemas.CreateRegionDtoSchema>
      method="POST"
      schema={schemas.CreateRegionDtoSchema}
      url={`${import.meta.env.VITE_API_URL}/regions`}
      defaultValues={{ name: "" }}
      queryKey="all-regions"
      recordLabel="Region"
      renderContentsFn={RegionFormContent}
    />
  );
}

export function UpdateRegionForm() {
  return (
    <FeatureForm<typeof schemas.UpdateRegionDtoSchema>
      method="PATCH"
      schema={schemas.UpdateRegionDtoSchema}
      url={`${import.meta.env.VITE_API_URL}/regions`}
      defaultValues={{ name: "" }}
      queryKey="all-regions"
      recordLabel="Region"
      renderContentsFn={RegionFormContent}
    />
  );
}
