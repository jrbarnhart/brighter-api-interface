import ComboboxSingleIdId from "@/components/combobox/ComboboxSingleId";
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

type MonsterFormFetchedData = {
  combatSkills: Data<
    paths["/skills/combat"]["get"]["responses"]["200"]["content"]["application/json"]
  >;

  regions: Data<
    paths["/regions"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
};

type MonsterFormFields = {
  name: string;
  attackElement: components["schemas"]["AttackElementsEnum"]["value"];
  immuneElement: components["schemas"]["AttackElementsEnum"]["value"];
  vulnerableElement: components["schemas"]["AttackElementsEnum"]["value"];
  skillId: number;
  regionId: number;
  passive: boolean;
};

const MonsterFormContent = ({
  form,
}: {
  form: UseFormReturn<MonsterFormFields>;
}) => {
  const { isLoading, isSuccess, error, data } =
    useQuery<MonsterFormFetchedData>({
      queryKey: [queryKeys.monsterForm],
      queryFn: async (): Promise<MonsterFormFetchedData> => {
        try {
          const combatSkillsResponse = await axiosClient.get<
            Data<
              paths["/skills/combat"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/skills/combat");

          const regionsResponse = await axiosClient.get<
            Data<
              paths["/regions"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/regions");

          return {
            combatSkills: combatSkillsResponse.data,
            regions: regionsResponse.data,
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
  const { combatSkills, regions } = data;

  return (
    <>
      {/* Monster Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Monster Name" {...field} />
            </FormControl>
            <FormDescription>The name of the monster.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Skill Id */}
      <ComboboxSingleIdId
        form={form}
        data={combatSkills.data}
        fieldName="skillId"
        label="Skill"
        description="The combat skill this monster is fought with."
      />
      {/* Region Id */}
      <ComboboxSingleIdId
        form={form}
        data={regions.data}
        fieldName="regionId"
        label="Region"
        description="The region this monster is in."
      />
      {/* Attack Element */}
      <SelectField
        form={form}
        data={schemas.CreateMonsterDtoSchema.shape.attackElement._def.values}
        fieldName="attackElement"
        label="Attack Element"
        description="The element this monster attacks with."
      />
      {/* Immune Element */}
      <SelectField
        form={form}
        data={schemas.CreateMonsterDtoSchema.shape.immuneElement._def.values}
        fieldName="immuneElement"
        label="Immune Element"
        description="The element this monster is immune to."
      />
      {/* Vulnerable Element */}
      <SelectField
        form={form}
        data={
          schemas.CreateMonsterDtoSchema.shape.vulnerableElement._def.values
        }
        fieldName="vulnerableElement"
        label="Vulnerable Element"
        description="The element this monster is vulnerable to."
      />
      {/* Passive */}
      <FormField
        control={form.control}
        name="passive"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Is Passive:</FormLabel>
            <FormControl>
              <div className="w-full">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  defaultChecked={field.value}
                />
              </div>
            </FormControl>
            <FormDescription>Is this a passive monster?</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export function CreateMonsterForm() {
  const form = useForm<MonsterFormFields>({
    resolver: zodResolver(schemas.CreateMonsterDtoSchema),
    defaultValues: {
      name: "",
      skillId: 0,
      regionId: 0,
      attackElement: "NONE",
      immuneElement: "NONE",
      vulnerableElement: "NONE",
      passive: false,
    },
  });

  return (
    <FeatureForm<MonsterFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/monsters`}
      queryKey={queryKeys.monsters}
      recordLabel="Monster"
    >
      <MonsterFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateMonsterForm({
  record,
}: {
  record: components["schemas"]["MonsterEntity"];
}) {
  const form = useForm<MonsterFormFields>({
    resolver: zodResolver(schemas.UpdateMonsterDtoSchema),
    defaultValues: {
      name: record.name,
      skillId: record.skillId,
      regionId: record.regionId,
      attackElement: record.attackElement,
      immuneElement: record.immuneElement,
      vulnerableElement: record.vulnerableElement,
      passive: record.passive,
    },
  });

  return (
    <FeatureForm<MonsterFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/monsters`}
      queryKey={queryKeys.monsters}
      recordLabel="Monster"
    >
      <MonsterFormContent form={form} />
    </FeatureForm>
  );
}
