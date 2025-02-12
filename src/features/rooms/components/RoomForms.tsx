import { useForm, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FeatureForm from "@/components/featureForm/FeatureForm";
import { schemas } from "@/schemas/openapi-zod-schemas";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ComboboxIds from "@/components/combobox/ComboboxIds";
import { useQuery } from "@tanstack/react-query";
import { components, paths } from "@/types/api";
import { axiosClient } from "@/queries/axiosClient";
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import ComboboxEnum from "@/components/combobox/ComboboxEnum";
import { useEffect } from "react";

type RoomsFormData = {
  regions: Data<
    paths["/regions"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
  craftingSkills: Data<
    paths["/skills/crafting"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
  monsters: Data<
    paths["/monsters"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
  npcs: Data<
    paths["/npcs"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
  resources: Data<
    paths["/items/resources"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
  questSteps: Data<
    paths["/quests/steps"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
};

type RoomFormFields = {
  name: string;
  regionId: number;
  portal: boolean;
  obelisk: boolean;
  banks: string[];
  craftingSkillIds: number[];
  monsterIds: number[];
  npcIds: number[];
  resourceIds: number[];
  questStepIds: number[];
  removeCraftingSkillIds: number[];
  removeMonsterIds: number[];
  removeNpcIds: number[];
  removeResourceIds: number[];
  removeQuestStepIds: number[];
};

const RoomFormContent = ({ form }: { form: UseFormReturn<RoomFormFields> }) => {
  const { isLoading, isSuccess, error, data } = useQuery<RoomsFormData>({
    queryKey: [
      "all-regions",
      "all-crafting-skills",
      "all-monsters",
      "all-npcs",
      "all-resources",
      "all-quest-steps",
    ],
    queryFn: async (): Promise<RoomsFormData> => {
      try {
        const regionsResponse = await axiosClient.get<
          Data<
            paths["/regions"]["get"]["responses"]["200"]["content"]["application/json"]
          >
        >("/regions");
        const regions = regionsResponse.data;

        const craftingSkillsResponse = await axiosClient.get<
          Data<
            paths["/skills/crafting"]["get"]["responses"]["200"]["content"]["application/json"]
          >
        >("/skills/crafting");
        const craftingSkills = craftingSkillsResponse.data;

        const monstersResponse = await axiosClient.get<
          Data<
            paths["/monsters"]["get"]["responses"]["200"]["content"]["application/json"]
          >
        >("/monsters");
        const monsters = monstersResponse.data;

        const npcsResponse = await axiosClient.get<
          Data<
            paths["/npcs"]["get"]["responses"]["200"]["content"]["application/json"]
          >
        >("/npcs");
        const npcs = npcsResponse.data;

        const resourcesResponse = await axiosClient.get<
          Data<
            paths["/items/resources"]["get"]["responses"]["200"]["content"]["application/json"]
          >
        >("/items/resources");
        const resources = resourcesResponse.data;

        const questStepsResponse = await axiosClient.get<
          Data<
            paths["/quests/steps"]["get"]["responses"]["200"]["content"]["application/json"]
          >
        >("/quests/steps");
        const questSteps = questStepsResponse.data;

        return {
          regions,
          craftingSkills,
          monsters,
          npcs,
          resources,
          questSteps,
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
  const { regions, craftingSkills, monsters, npcs, resources, questSteps } =
    data;

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
              <Input placeholder="Room Name" {...field} />
            </FormControl>
            <FormDescription>The name of the room.</FormDescription>
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
            <FormControl>
              <Select
                onValueChange={(value) => {
                  form.setValue("regionId", Number(value), {
                    shouldValidate: true,
                  });
                }}
                defaultValue={field.value.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {regions.data.map((region) => (
                      <SelectItem value={region.id.toString()} key={region.id}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription>
              The id of the Region this room is in.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Is Portal */}
      <FormField
        control={form.control}
        name="portal"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Portal Room:</FormLabel>
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
              Does this room have a portal in it?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Is Obelisk */}
      <FormField
        control={form.control}
        name="obelisk"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Obelisk Room:</FormLabel>
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
      {/* Banks */}
      <ComboboxEnum
        form={form}
        data={
          schemas.CreateRoomDtoSchema.shape.banks._def.innerType._def.type
            .options
        }
        description="Select bank types in this room."
        fieldName="banks"
        label="Banks"
      />
      {/* Crafting Skills (Spots) */}
      <ComboboxIds
        form={form}
        data={craftingSkills.data}
        description="Select ids for crafting skills with crafting spots in this room."
        fieldName="craftingSkillIds"
        removeFieldName="removeCraftingSkillIds"
        label="Crafting Skill"
      />
      {/* Monsters */}
      <ComboboxIds
        form={form}
        data={monsters.data}
        description="Select ids for monsters in this room."
        fieldName="monsterIds"
        removeFieldName="removeMonsterIds"
        label="Monsters"
      />
      {/* NPC's */}
      <ComboboxIds
        form={form}
        data={npcs.data}
        description="Select ids for NPC's in this room."
        fieldName="npcIds"
        removeFieldName="removeNpcIds"
        label="NPC's"
      />
      {/* Resources */}
      <ComboboxIds
        form={form}
        data={resources.data}
        description="Select ids for resources in this room."
        fieldName="resourceIds"
        removeFieldName="removeResourceIds"
        label="Resources"
      />
      {/* Quest Steps */}
      <ComboboxIds
        form={form}
        data={questSteps.data}
        description="Select ids for quest steps in this room."
        fieldName="questStepIds"
        removeFieldName="removeQuestStepIds"
        label="Quest Steps"
      />
    </>
  );
};

export function CreateRoomForm() {
  const form = useForm<RoomFormFields>({
    resolver: zodResolver(schemas.CreateRoomDtoSchema),
    defaultValues: {
      name: "",
      regionId: 0,
      portal: false,
      obelisk: false,
      banks: [],
      craftingSkillIds: [],
      monsterIds: [],
      npcIds: [],
      resourceIds: [],
      questStepIds: [],
    },
  });

  return (
    <FeatureForm<RoomFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/rooms`}
      queryKey="all-rooms"
      recordLabel="Room"
    >
      <RoomFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateRoomForm({
  record,
}: {
  record: components["schemas"]["RoomEntity"];
}) {
  const form = useForm<RoomFormFields>({
    resolver: zodResolver(schemas.UpdateRoomDtoSchema),
    defaultValues: {
      name: record.name,
      regionId: record.regionId,
      portal: record.portal,
      obelisk: record.obelisk,
      banks: record.banks,
      craftingSkillIds: record.craftingSkills.map((skill) => skill.id),
      monsterIds: record.monsters.map((monster) => monster.id),
      npcIds: record.npcs.map((npc) => npc.id),
      resourceIds: record.resources.map((resource) => resource.id),
      questStepIds: record.questSteps.map((questStep) => questStep.id),
      removeCraftingSkillIds: [],
      removeMonsterIds: [],
      removeNpcIds: [],
      removeResourceIds: [],
      removeQuestStepIds: [],
    },
  });

  return (
    <FeatureForm<RoomFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/rooms`}
      queryKey="all-rooms"
      recordLabel="Room"
    >
      <RoomFormContent form={form} />
    </FeatureForm>
  );
}
