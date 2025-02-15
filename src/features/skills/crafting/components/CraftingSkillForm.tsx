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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import queryKeys from "@/lib/queryKeys";
import { axiosClient } from "@/queries/axiosClient";
import { schemas } from "@/schemas/openapi-zod-schemas";
import { components, paths } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

type CraftingSkillFormFetchedData = {
  regions: Data<
    paths["/regions"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
};

type CraftingSkillFormFields = {
  name: string;
  regionId: number;
};

const CraftingSkillFormContent = ({
  form,
}: {
  form: UseFormReturn<CraftingSkillFormFields>;
}) => {
  const { isLoading, isSuccess, error, data } =
    useQuery<CraftingSkillFormFetchedData>({
      queryKey: [queryKeys.craftingSkillForm],
      queryFn: async (): Promise<CraftingSkillFormFetchedData> => {
        try {
          const regionsResponse = await axiosClient.get<
            Data<
              paths["/regions"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/regions");
          return { regions: regionsResponse.data };
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
  const { regions } = data;

  return (
    <>
      {/* Room Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Crafting Skill Name" {...field} />
            </FormControl>
            <FormDescription>The name of the skill.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Region Id */}
      <FormField
        control={form.control}
        name="regionId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Region Id</FormLabel>
            <Select
              onValueChange={(value) => {
                form.setValue("regionId", Number(value), {
                  shouldValidate: true,
                });
              }}
              defaultValue={field.value.toString()}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue>
                    {field.value === 0
                      ? "Select a region"
                      : regions.data.find((r) => r.id === field.value)?.name}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {regions.data.map((region) => (
                  <SelectItem value={region.id.toString()} key={region.id}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              The id of the Region this skill is in.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export function CreateCraftingSkillForm() {
  const form = useForm<CraftingSkillFormFields>({
    resolver: zodResolver(schemas.CreateCraftingSkillDtoSchema),
    defaultValues: {
      name: "",
      regionId: 0,
    },
  });

  return (
    <FeatureForm<CraftingSkillFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/skills/crafting`}
      queryKey={queryKeys.craftingSkills}
      recordLabel="Crafting Skill"
    >
      <CraftingSkillFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateCraftingSkillForm({
  record,
}: {
  record: components["schemas"]["CraftingSkillEntity"];
}) {
  const form = useForm<CraftingSkillFormFields>({
    resolver: zodResolver(schemas.UpdateCraftingSkillDtoSchema),
    defaultValues: {
      name: record.name,
      regionId: record.regionId,
    },
  });

  return (
    <FeatureForm<CraftingSkillFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/skills/crafting`}
      queryKey={queryKeys.craftingSkills}
      recordLabel="Crafting Skill"
    >
      <CraftingSkillFormContent form={form} />
    </FeatureForm>
  );
}
