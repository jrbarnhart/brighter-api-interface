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

type QuestFormFetchedData = {
  regions: paths["/regions"]["get"]["responses"]["200"]["content"]["application/json"];
};

type QuestFormFields = {
  name: string;
  regionId: number;
};

const QuestFormContent = ({
  form,
}: {
  form: UseFormReturn<QuestFormFields>;
}) => {
  const { isLoading, isSuccess, error, data } = useQuery<QuestFormFetchedData>({
    queryKey: [queryKeys.questForm],
    queryFn: async (): Promise<QuestFormFetchedData> => {
      try {
        const regionsResponse = await axiosClient.get<
          paths["/regions"]["get"]["responses"]["200"]["content"]["application/json"]
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
      {/* Quest Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Quest Name" {...field} />
            </FormControl>
            <FormDescription>The name of the quest.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Region Id */}
      <ComboboxSingleId
        form={form}
        data={regions}
        fieldName="regionId"
        label="Region"
        description="Region this quest belongs to."
      />
    </>
  );
};

export function CreateQuestForm() {
  const form = useForm<QuestFormFields>({
    resolver: zodResolver(schemas.CreateQuestDtoSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <FeatureForm<QuestFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/quests`}
      queryKey={queryKeys.quests}
      recordLabel="Quest"
    >
      <QuestFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateQuestForm({
  record,
}: {
  record: components["schemas"]["QuestEntity"];
}) {
  const form = useForm<QuestFormFields>({
    resolver: zodResolver(schemas.UpdateQuestDtoSchema),
    defaultValues: {
      name: record.name,
    },
  });

  return (
    <FeatureForm<QuestFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/quests`}
      queryKey={queryKeys.quests}
      recordLabel="Quest"
    >
      <QuestFormContent form={form} />
    </FeatureForm>
  );
}
