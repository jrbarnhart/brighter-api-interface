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

type GatheringSkillRequirementFormFetchedData = {
  gatheringSkills: Data<
    paths["/skills/gathering"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
  resourceVariants: Data<
    paths["/items/resources/variants"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
};

type GatheringSkillRequirementFormFields = {
  skillId: number;
  unlockLevel: number;
  description: string;
  resourceVariantId: number | null;
};

const GatheringSkillRequirementFormContent = ({
  form,
  record,
}: {
  form: UseFormReturn<GatheringSkillRequirementFormFields>;
  record?: components["schemas"]["GatheringSkillRequirementEntity"];
}) => {
  const { isLoading, isSuccess, error, data } =
    useQuery<GatheringSkillRequirementFormFetchedData>({
      queryKey: [queryKeys.gatheringSkillRequirementForm],
      queryFn: async (): Promise<GatheringSkillRequirementFormFetchedData> => {
        try {
          const gatheringSkillsResponse = await axiosClient.get<
            Data<
              paths["/skills/gathering"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/skills/gathering");

          const resourceVariantsResponse = await axiosClient.get<
            Data<
              paths["/items/resources/variants"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/items/resources/variants");

          return {
            gatheringSkills: gatheringSkillsResponse.data,
            resourceVariants: resourceVariantsResponse.data,
          };
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
  const { gatheringSkills, resourceVariants } = data;
  const unsetResourceVariants = resourceVariants.data.filter(
    (variant) =>
      !variant.requirement?.id || variant.requirement.id === record?.id
  );

  return (
    <>
      {/* Skill Id */}
      <FormField
        control={form.control}
        name="skillId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Skill</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(Number(value));
              }}
              defaultValue={field.value.toString()}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue>
                    {field.value === 0
                      ? "Select a gathering skill"
                      : gatheringSkills.data.find((s) => s.id === field.value)
                          ?.name}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {gatheringSkills.data.map((skill) => (
                  <SelectItem key={skill.id} value={skill.id.toString()}>
                    {skill.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Select the gathering skill this requirement is for.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Unlock Level */}
      <FormField
        control={form.control}
        name="unlockLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Unlock Level</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Unlock level"
                min={0}
                {...field}
                value={field.value === 0 ? "" : field.value} // Show placeholder instead of 0
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? 0 : Number(e.target.value);
                  field.onChange(value);
                }}
              />
            </FormControl>
            <FormDescription>
              What level does this requirement unlock?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Description */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input placeholder="Skill requirement description" {...field} />
            </FormControl>
            <FormDescription>
              Short description of the requirement.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Resource Variant Id */}
      <ComboboxSingleIdId
        form={form}
        data={unsetResourceVariants}
        description="Id of variant unlocked. Optional. Variant requirementId must be null."
        fieldName="resourceVariantId"
        label="Resource Variant Id"
        nullable
      />
    </>
  );
};

export function CreateGatheringSkillRequirementForm() {
  const form = useForm<GatheringSkillRequirementFormFields>({
    resolver: zodResolver(schemas.CreateGatheringSkillRequirementDtoSchema),
    defaultValues: {
      skillId: 0,
      unlockLevel: 0,
      description: "",
      resourceVariantId: null,
    },
  });

  return (
    <FeatureForm<GatheringSkillRequirementFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/skills/gathering/requirements`}
      queryKey={queryKeys.gatheringSkillRequirements}
      recordLabel="Gathering Skill Requirement"
    >
      <GatheringSkillRequirementFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateGatheringSkillRequirementForm({
  record,
}: {
  record: components["schemas"]["GatheringSkillRequirementEntity"];
}) {
  const form = useForm<GatheringSkillRequirementFormFields>({
    resolver: zodResolver(schemas.UpdateGatheringSkillRequirementDtoSchema),
    defaultValues: {
      skillId: record.skillId,
      unlockLevel: record.unlockLevel,
      description: record.description ?? "",
      resourceVariantId: record.resourceVariant?.id ?? null,
    },
  });

  return (
    <FeatureForm<GatheringSkillRequirementFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/skills/gathering/requirements`}
      queryKey={queryKeys.gatheringSkillRequirements}
      recordLabel="Gathering Skill Requirement"
    >
      <GatheringSkillRequirementFormContent form={form} record={record} />
    </FeatureForm>
  );
}
