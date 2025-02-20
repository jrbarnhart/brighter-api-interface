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
import { axiosClient } from "@/queries/axiosClient";
import { schemas } from "@/schemas/openapi-zod-schemas";
import { components, paths } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

type ResourceFormFetchedData = {
  gatheringSkills: Data<
    paths["/skills/gathering"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
};

type ResourceFormFields = {
  name: string;
  skillId: number;
  passive: boolean;
};

const ResourceFormContent = ({
  form,
}: {
  form: UseFormReturn<ResourceFormFields>;
}) => {
  const { isLoading, isSuccess, error, data } =
    useQuery<ResourceFormFetchedData>({
      queryKey: [queryKeys.resourceForm],
      queryFn: async (): Promise<ResourceFormFetchedData> => {
        try {
          const gatheringSkillsResponse = await axiosClient.get<
            Data<
              paths["/skills/gathering"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/skills/gathering");
          return { gatheringSkills: gatheringSkillsResponse.data };
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
  const { gatheringSkills } = data;

  return (
    <>
      {/* Resource Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Resource Name" {...field} />
            </FormControl>
            <FormDescription>The name of the resource.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Skill Id */}
      <SelectField
        form={form}
        data={gatheringSkills.data}
        fieldName="skillId"
        label="Skill"
        description="The skill this resource is gathered by."
        valueType="number"
      />
      {/* Is Passive */}
      <FormField
        control={form.control}
        name="passive"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Passive:</FormLabel>
            <FormControl>
              <div className="w-full">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  defaultChecked={field.value}
                />
              </div>
            </FormControl>
            <FormDescription>
              Does this room have an obelisk in it?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export function CreateResourceForm() {
  const form = useForm<ResourceFormFields>({
    resolver: zodResolver(schemas.CreateResourceDtoSchema),
    defaultValues: {
      name: "",
      skillId: 0,
      passive: false,
    },
  });

  return (
    <FeatureForm<ResourceFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/items/resources`}
      queryKey={queryKeys.resources}
      recordLabel="Resource"
    >
      <ResourceFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateResourceForm({
  record,
}: {
  record: components["schemas"]["ResourceEntity"];
}) {
  const form = useForm<ResourceFormFields>({
    resolver: zodResolver(schemas.UpdateResourceDtoSchema),
    defaultValues: {
      name: record.name,
      skillId: record.skillId,
      passive: record.passive,
    },
  });

  return (
    <FeatureForm<ResourceFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/items/resources`}
      queryKey={queryKeys.resources}
      recordLabel="Resource"
    >
      <ResourceFormContent form={form} />
    </FeatureForm>
  );
}
