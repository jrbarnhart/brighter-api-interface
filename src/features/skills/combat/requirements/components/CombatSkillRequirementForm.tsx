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

type CombatSkillRequirementFormFetchedData = {
  combatSkills: Data<
    paths["/skills/combat"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
  monsterVariants: Data<
    paths["/monsters/variants"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
};

type CombatSkillRequirementFormFields = {
  skillId: number;
  unlockLevel: number;
  description: string;
  monsterVariantId: number | null;
};

const CombatSkillRequirementFormContent = ({
  form,
}: {
  form: UseFormReturn<CombatSkillRequirementFormFields>;
}) => {
  const { isLoading, isSuccess, error, data } =
    useQuery<CombatSkillRequirementFormFetchedData>({
      queryKey: [queryKeys.combatSkillRequirementForm],
      queryFn: async (): Promise<CombatSkillRequirementFormFetchedData> => {
        try {
          const combatSkillsResponse = await axiosClient.get<
            Data<
              paths["/skills/combat"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/skills/combat");

          const monsterVariantsResponse = await axiosClient.get<
            Data<
              paths["/monsters/variants"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/monsters/variants");

          return {
            combatSkills: combatSkillsResponse.data,
            monsterVariants: monsterVariantsResponse.data,
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
  const { combatSkills, monsterVariants } = data;

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
                  <SelectValue placeholder="Select a combat skill" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {combatSkills.data.map((skill) => (
                  <SelectItem key={skill.id} value={skill.id.toString()}>
                    {skill.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Select the combat skill this requirement is for.
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
                placeholder="99"
                {...field}
                onChange={(e) => {
                  field.onChange(Number(e.target.value));
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
      {/* Monster Variant Id */}
      <ComboboxSingleIdId
        form={form}
        data={monsterVariants.data}
        description="Id of monster variant unlocked by this requirement. Can be null."
        fieldName="monsterVariantId"
        label="Monster Variant Id"
      />
    </>
  );
};

export function CreateCombatSkillRequirementForm() {
  const form = useForm<CombatSkillRequirementFormFields>({
    resolver: zodResolver(schemas.CreateCombatSkillRequirementDtoSchema),
    defaultValues: {
      skillId: 0,
      unlockLevel: 0,
      description: "",
      monsterVariantId: null,
    },
  });

  return (
    <FeatureForm<CombatSkillRequirementFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/skills/combat/requirements`}
      queryKey={queryKeys.combatSkillRequirements}
      recordLabel="Combat Skill"
    >
      <CombatSkillRequirementFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateCombatSkillRequirementForm({
  record,
}: {
  record: components["schemas"]["CombatSkillRequirementEntity"];
}) {
  const form = useForm<CombatSkillRequirementFormFields>({
    resolver: zodResolver(schemas.UpdateCombatSkillRequirementDtoSchema),
    defaultValues: {
      skillId: record.skillId,
      unlockLevel: record.unlockLevel,
      description: record.description ?? "",
      monsterVariantId: record.monsterVariantId ?? null,
    },
  });

  return (
    <FeatureForm<CombatSkillRequirementFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/skills/combat/requirements`}
      queryKey={queryKeys.combatSkillRequirements}
      recordLabel="Combat Skill"
    >
      <CombatSkillRequirementFormContent form={form} />
    </FeatureForm>
  );
}
