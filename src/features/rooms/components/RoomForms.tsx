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
import Combobox from "@/components/combobox/Combobox";
import { useQuery } from "@tanstack/react-query";
import { paths } from "@/types/api";
import { axiosClient } from "@/queries/axiosClient";
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";

type RoomsFormData = {
  regions: Data<
    paths["/regions"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
  craftingSkills: Data<
    paths["/skills/crafting"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
};

type RoomsFormFields = {
  name: string;
  regionId: number;
  portal: boolean;
  obelisk: boolean;
  craftingSkillIds: number[];
  monsterIds: number[];
  npcIds: number[];
  resourceIds: number[];
  questStepIds: number[];
};

const RoomFormContent = ({
  form,
}: {
  form: UseFormReturn<RoomsFormFields>;
}) => {
  const { isLoading, isSuccess, error, data } = useQuery<RoomsFormData>({
    queryKey: ["all-regions", "all-crafting-skills"],
    queryFn: async (): Promise<RoomsFormData> => {
      try {
        const regionsResponse = await axiosClient.get<
          Data<
            paths["/regions"]["get"]["responses"]["200"]["content"]["application/json"]
          >
        >("/regions");
        const foundRegions = regionsResponse.data;

        const craftingSkillsResponse = await axiosClient.get<
          Data<
            paths["/skills/crafting"]["get"]["responses"]["200"]["content"]["application/json"]
          >
        >("/skills/crafting");
        const foundCraftingSkills = craftingSkillsResponse.data;

        return { regions: foundRegions, craftingSkills: foundCraftingSkills };
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

  const { regions, craftingSkills } = data;

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Region Id" {...field} />
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
            <FormLabel>Is Portal Room:</FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormDescription>The name of the room.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Combobox
        form={form}
        data={craftingSkills.data}
        description="Select crafting skill ids for skills with crafting spots in this room."
        fieldName="craftingSkillIds"
        label="Crafting Skill"
      />
    </>
  );
};

export function CreateRoomForm() {
  const form = useForm<RoomsFormFields>({
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
    <FeatureForm<RoomsFormFields>
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
  const form = useForm<RoomsFormFields>({
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
    <FeatureForm<RoomsFormFields>
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
