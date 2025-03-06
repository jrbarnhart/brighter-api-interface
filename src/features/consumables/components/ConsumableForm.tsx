import ComboboxSingleId from "@/components/combobox/ComboboxSingleId";
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
import queryKeys from "@/lib/queryKeys";
import { axiosClient } from "@/queries/axiosClient";
import { schemas } from "@/schemas/openapi-zod-schemas";
import { components, paths } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

type ConsumableFormFetchedData = {
  craftingSkills: Data<
    paths["/skills/crafting"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
};

type ConsumableFormFields = {
  name: string;
  skillId: number | null;
};

const ConsumableFormContent = ({
  form,
}: {
  form: UseFormReturn<ConsumableFormFields>;
}) => {
  const { isLoading, isSuccess, error, data } =
    useQuery<ConsumableFormFetchedData>({
      queryKey: [queryKeys.consumableForm],
      queryFn: async (): Promise<ConsumableFormFetchedData> => {
        try {
          const craftingSkillsResponse = await axiosClient.get<
            Data<
              paths["/skills/crafting"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/skills/crafting");
          return { craftingSkills: craftingSkillsResponse.data };
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
  const { craftingSkills } = data;

  return (
    <>
      {/* Consumable Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Consumable Name" {...field} />
            </FormControl>
            <FormDescription>The name of the consumable.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Skill Id */}
      <ComboboxSingleId
        form={form}
        data={craftingSkills.data}
        description="Id of the crafting skill that makes this. Optional."
        fieldName="skillId"
        label="Crafting Skill"
        nullable
      />
    </>
  );
};

export function CreateConsumableForm() {
  const form = useForm<ConsumableFormFields>({
    resolver: zodResolver(schemas.CreateConsumableDtoSchema),
    defaultValues: {
      name: "",
      skillId: null,
    },
  });

  return (
    <FeatureForm<ConsumableFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/items/consumables`}
      queryKey={queryKeys.consumables}
      recordLabel="Consumable"
    >
      <ConsumableFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateConsumableForm({
  record,
}: {
  record: components["schemas"]["ConsumableEntity"];
}) {
  const form = useForm<ConsumableFormFields>({
    resolver: zodResolver(schemas.UpdateConsumableDtoSchema),
    defaultValues: {
      name: record.name,
      skillId: record.skillId,
    },
  });

  return (
    <FeatureForm<ConsumableFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/items/consumables`}
      queryKey={queryKeys.consumables}
      recordLabel="Consumable"
    >
      <ConsumableFormContent form={form} />
    </FeatureForm>
  );
}
