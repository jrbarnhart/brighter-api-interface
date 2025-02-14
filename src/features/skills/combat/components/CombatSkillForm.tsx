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

type CombatSkillFormFetchedData = {
  regions: Data<
    paths["/regions"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
};

type CombatSkillFormFields = {
  name: string;
  regionId: number;
};

const CombatSkillFormContent = ({
  form,
}: {
  form: UseFormReturn<CombatSkillFormFields>;
}) => {
  const { isLoading, isSuccess, error, data } =
    useQuery<CombatSkillFormFetchedData>({
      queryKey: [queryKeys.combatSkillForm],
      queryFn: async (): Promise<CombatSkillFormFetchedData> => {
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
              <Input placeholder="Combat Skill Name" {...field} />
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

export function CreateCombatSkillForm() {
  const form = useForm<CombatSkillFormFields>({
    resolver: zodResolver(schemas.CreateCombatSkillDtoSchema),
    defaultValues: {
      name: "",
      regionId: 0,
    },
  });

  return (
    <FeatureForm<CombatSkillFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/skills/combat`}
      queryKey={queryKeys.combatSkills}
      recordLabel="Combat Skill"
    >
      <CombatSkillFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateCombatSkillForm({
  record,
}: {
  record: components["schemas"]["CombatSkillEntity"];
}) {
  const form = useForm<CombatSkillFormFields>({
    resolver: zodResolver(schemas.UpdateCombatSkillDtoSchema),
    defaultValues: {
      name: record.name,
      regionId: record.regionId,
    },
  });

  return (
    <FeatureForm<CombatSkillFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/skills/combat`}
      queryKey={queryKeys.combatSkills}
      recordLabel="Combat Skill"
    >
      <CombatSkillFormContent form={form} />
    </FeatureForm>
  );
}
