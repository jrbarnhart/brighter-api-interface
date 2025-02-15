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

type CraftingSkillRequirementFormFetchedData = {
  craftingSkills: Data<
    paths["/skills/crafting"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
  recipes: Data<
    paths["/skills/crafting/recipes"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
};

type CraftingSkillRequirementFormFields = {
  skillId: number;
  unlockLevel: number;
  description: string;
  recipeId: number | null;
};

const CraftingSkillRequirementFormContent = ({
  form,
  record,
}: {
  form: UseFormReturn<CraftingSkillRequirementFormFields>;
  record?: components["schemas"]["CraftingSkillRequirementEntity"];
}) => {
  const { isLoading, isSuccess, error, data } =
    useQuery<CraftingSkillRequirementFormFetchedData>({
      queryKey: [queryKeys.craftingSkillRequirementForm],
      queryFn: async (): Promise<CraftingSkillRequirementFormFetchedData> => {
        try {
          const craftingSkillsResponse = await axiosClient.get<
            Data<
              paths["/skills/crafting"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/skills/crafting");

          const recipesResponse = await axiosClient.get<
            Data<
              paths["/skills/crafting/recipes"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/skills/crafting/recipes");

          return {
            craftingSkills: craftingSkillsResponse.data,
            recipes: recipesResponse.data,
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
  const { craftingSkills, recipes } = data;
  const unsetRecipes = recipes.data.filter(
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
                      ? "Select a crafting skill"
                      : craftingSkills.data.find((s) => s.id === field.value)
                          ?.name}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {craftingSkills.data.map((skill) => (
                  <SelectItem key={skill.id} value={skill.id.toString()}>
                    {skill.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Select the crafting skill this requirement is for.
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
      {/* Recipe Variant Id */}
      <ComboboxSingleIdId
        form={form}
        data={unsetRecipes}
        description="Id of recipe unlocked. Optional. Recipe requirementId must be null."
        fieldName="recipeId"
        label="Recipe Id"
        nullable
      />
    </>
  );
};

export function CreateCraftingSkillRequirementForm() {
  const form = useForm<CraftingSkillRequirementFormFields>({
    resolver: zodResolver(schemas.CreateCraftingSkillRequirementDtoSchema),
    defaultValues: {
      skillId: 0,
      unlockLevel: 0,
      description: "",
      recipeId: null,
    },
  });

  return (
    <FeatureForm<CraftingSkillRequirementFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/skills/crafting/requirements`}
      queryKey={queryKeys.craftingSkillRequirements}
      recordLabel="Crafting Skill Requirement"
    >
      <CraftingSkillRequirementFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateCraftingSkillRequirementForm({
  record,
}: {
  record: components["schemas"]["CraftingSkillRequirementEntity"];
}) {
  const form = useForm<CraftingSkillRequirementFormFields>({
    resolver: zodResolver(schemas.UpdateCraftingSkillRequirementDtoSchema),
    defaultValues: {
      skillId: record.skillId,
      unlockLevel: record.unlockLevel,
      description: record.description ?? "",
      recipeId: record.recipeId ?? null,
    },
  });

  return (
    <FeatureForm<CraftingSkillRequirementFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/skills/crafting/requirements`}
      queryKey={queryKeys.craftingSkillRequirements}
      recordLabel="Crafting Skill Requirement"
    >
      <CraftingSkillRequirementFormContent form={form} record={record} />
    </FeatureForm>
  );
}
