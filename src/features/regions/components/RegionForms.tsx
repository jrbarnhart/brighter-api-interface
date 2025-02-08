import { UseFormReturn } from "react-hook-form";
import { CreateRegionSchema } from "../schemas/create-region.schema";
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
import { UpdateRegionSchema } from "../schemas/update-region.schema";

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
    <FeatureForm<typeof CreateRegionSchema>
      method="POST"
      schema={CreateRegionSchema}
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
    <FeatureForm<typeof UpdateRegionSchema>
      method="PATCH"
      schema={UpdateRegionSchema}
      url={`${import.meta.env.VITE_API_URL}/regions`}
      defaultValues={{ name: "" }}
      queryKey="all-regions"
      recordLabel="Region"
      renderContentsFn={RegionFormContent}
    />
  );
}
