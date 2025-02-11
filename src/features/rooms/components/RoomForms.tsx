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
import { paths } from "@/types/api";
import { axiosClient } from "@/queries/axiosClient";
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import ComboboxEnum from "@/components/combobox/ComboboxEnum";

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
};

const RoomFormContent = ({ form }: { form: UseFormReturn<RoomFormFields> }) => {
  const { isLoading, isSuccess, error, data } = useQuery<RoomsFormData>({
    queryKey: ["all-regions", "all-crafting-skills"],
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

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!isSuccess) {
    return (
      <div>
        <p>There was a problem fetching the data.</p>
      </div>
    );
  }

  const { regions, craftingSkills, monsters, npcs, resources, questSteps } =
    data;

  return (
    <>
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
                defaultValue={
                  typeof field.value === "string" ? field.value : ""
                }
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
      <ComboboxIds
        form={form}
        data={craftingSkills.data}
        description="Select ids for crafting skills with crafting spots in this room."
        fieldName="craftingSkillIds"
        label="Crafting Skill"
      />
      <ComboboxIds
        form={form}
        data={monsters.data}
        description="Select ids for monsters in this room."
        fieldName="monsterIds"
        label="Monsters"
      />
      <ComboboxIds
        form={form}
        data={npcs.data}
        description="Select ids for NPC's in this room."
        fieldName="npcIds"
        label="NPC's"
      />
      <ComboboxIds
        form={form}
        data={resources.data}
        description="Select ids for resources in this room."
        fieldName="resourceIds"
        label="Resources"
      />
      <ComboboxIds
        form={form}
        data={questSteps.data}
        description="Select ids for quest steps in this room."
        fieldName="questStepIds"
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

export function UpdateRoomForm() {
  const form = useForm<RoomFormFields>({
    resolver: zodResolver(schemas.UpdateRoomDtoSchema),
    defaultValues: {
      name: "",
      regionId: 0,
      portal: false,
      obelisk: false,
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
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/rooms`}
      queryKey="all-rooms"
      recordLabel="Room"
    >
      <RoomFormContent form={form} />
    </FeatureForm>
  );
}
