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
import queryKeys from "@/lib/queryKeys";
import { axiosClient } from "@/queries/axiosClient";
import { schemas } from "@/schemas/openapi-zod-schemas";
import { components, paths } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

type QuestStepFormFetchedData = {
  quests: Data<
    paths["/quests"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
  rooms: Data<
    paths["/rooms"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
  npcs: Data<
    paths["/npcs"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
};

type QuestStepFormFields = {
  index: number;
  description: string;
  questId: number;
  roomId: number | null;
  npcId: number | null;
};

const QuestStepFormContent = ({
  form,
}: {
  form: UseFormReturn<QuestStepFormFields>;
}) => {
  const { isLoading, isSuccess, error, data } =
    useQuery<QuestStepFormFetchedData>({
      queryKey: [queryKeys.questStepForm],
      queryFn: async (): Promise<QuestStepFormFetchedData> => {
        try {
          const questsResponse = await axiosClient.get<
            Data<
              paths["/quests"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/quests");

          const roomsResponse = await axiosClient.get<
            Data<
              paths["/rooms"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/rooms");

          const npcsResponse = await axiosClient.get<
            Data<
              paths["/npcs"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/npcs");

          return {
            quests: questsResponse.data,
            rooms: roomsResponse.data,
            npcs: npcsResponse.data,
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
  const { quests, rooms, npcs } = data;

  return (
    <>
      {/* Index */}
      <FormField
        control={form.control}
        name="index"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Index</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Index #"
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
              Index determines the order of step completion.
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
              <Input placeholder="Step description" {...field} />
            </FormControl>
            <FormDescription>The description of this step.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Quest Id */}
      <ComboboxSingleIdId
        form={form}
        data={quests.data}
        fieldName="questId"
        label="Quest"
        description="Id of the quest this is a step of."
      />
      {/* Room Id */}
      <ComboboxSingleIdId
        form={form}
        data={rooms.data}
        fieldName="roomId"
        label="Room"
        description="Id of the room this step takes place in. Optional."
        nullable
      />
      {/* Npc Id */}
      <ComboboxSingleIdId
        form={form}
        data={npcs.data}
        fieldName="npcId"
        label="Npc"
        description="Id of the npc this step is triggered by or involves. Optional."
        nullable
      />
    </>
  );
};

export function CreateQuestStepForm() {
  const form = useForm<QuestStepFormFields>({
    resolver: zodResolver(schemas.CreateQuestStepDtoSchema),
    defaultValues: {
      index: 0,
      description: "",
      questId: 0,
      roomId: null,
      npcId: null,
    },
  });

  return (
    <FeatureForm<QuestStepFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/quests/steps`}
      queryKey={queryKeys.questSteps}
      recordLabel="QuestStep"
    >
      <QuestStepFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateQuestStepForm({
  record,
}: {
  record: components["schemas"]["QuestStepEntity"];
}) {
  const form = useForm<QuestStepFormFields>({
    resolver: zodResolver(schemas.UpdateQuestStepDtoSchema),
    defaultValues: {
      index: record.index,
      description: record.description,
      questId: record.questId,
      roomId: record.roomId,
      npcId: record.npcId,
    },
  });

  return (
    <FeatureForm<QuestStepFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/quests/steps`}
      queryKey={queryKeys.questSteps}
      recordLabel="QuestStep"
    >
      <QuestStepFormContent form={form} />
    </FeatureForm>
  );
}
