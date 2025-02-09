import { UseFormReturn } from "react-hook-form";
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
import { components } from "@/types/api";
import useGetRecords from "@/queries/useGetAllRecords";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RoomFormContent = ({ form }: { form: UseFormReturn }) => {
  const {
    isLoading,
    isSuccess,
    error,
    data: regionData,
  } = useGetRecords<{ data: components["schemas"]["RegionEntity"][] }>({
    queryKeyName: "all-regions",
    url: `${import.meta.env.VITE_API_URL}/regions`,
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

  const { data: regions } = regionData;

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
                onValueChange={field.onChange}
                defaultValue={
                  typeof field.value === "string" ? field.value : ""
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {regions.map((region) => (
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
    </>
  );
};

export function CreateRoomForm() {
  return (
    <FeatureForm<typeof schemas.CreateRoomDtoSchema>
      method="POST"
      schema={schemas.CreateRoomDtoSchema}
      url={`${import.meta.env.VITE_API_URL}/rooms`}
      defaultValues={{
        name: "",
        regionId: 0,
        portal: false,
        obelisk: false,
        craftingSkillIds: [],
        monsterIds: [],
        npcIds: [],
        resourceIds: [],
        questStepIds: [],
      }}
      queryKey="all-rooms"
      recordLabel="Room"
      renderContentsFn={RoomFormContent}
    />
  );
}

export function UpdateRoomForm() {
  return (
    <FeatureForm<typeof schemas.UpdateRoomDtoSchema>
      method="PATCH"
      schema={schemas.UpdateRoomDtoSchema}
      url={`${import.meta.env.VITE_API_URL}/rooms`}
      defaultValues={{
        name: "",
        regionId: 0,
        portal: false,
        obelisk: false,
        craftingSkillIds: [],
        monsterIds: [],
        npcIds: [],
        resourceIds: [],
        questStepIds: [],
      }}
      queryKey="all-rooms"
      recordLabel="Room"
      renderContentsFn={RoomFormContent}
    />
  );
}
