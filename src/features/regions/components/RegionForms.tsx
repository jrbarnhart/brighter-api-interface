import { useForm, UseFormReturn } from "react-hook-form";
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
import { zodResolver } from "@hookform/resolvers/zod";
import queryKeys from "@/lib/queryKeys";

type RegionFormFields = {
  name: string;
};

const RegionFormContent = ({
  form,
}: {
  form: UseFormReturn<RegionFormFields>;
}) => {
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
  const form = useForm<RegionFormFields>({
    resolver: zodResolver(schemas.CreateRegionDtoSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <FeatureForm<RegionFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/regions`}
      queryKeys={queryKeys.regions}
      recordLabel="Region"
    >
      <RegionFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateRegionForm() {
  const form = useForm<RegionFormFields>({
    resolver: zodResolver(schemas.UpdateRegionDtoSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <FeatureForm<RegionFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/regions`}
      queryKeys={queryKeys.regions}
      recordLabel="Region"
    >
      <RegionFormContent form={form} />
    </FeatureForm>
  );
}
