import RecordLink from "@/components/recordLink/RecordLink";
import ScrollList from "@/components/scrollList/ScrollList";
import { components } from "@/types/api";

export default function CraftingSkillDetailsContent({
  record,
}: {
  record: components["schemas"]["CraftingSkillEntity"];
}) {
  return (
    <>
      <p className="text-xl">Id: {record.id}</p>
      <div className="flex gap-3 items-center">
        <p className="text-xl">Region: </p>
        <RecordLink
          recordBasePath="/regions"
          recordId={record.region.id}
          recordName={record.region.name}
        />
      </div>
      <ScrollList
        basePath="rooms"
        title="Crafting Rooms"
        items={record.rooms}
      />
      <ScrollList
        basePath="skills/crafting/requirements"
        title="Requirements"
        items={record.requirements}
      />
      <ScrollList
        basePath="items/consumables"
        items={record.consumables}
        title="Consumables"
      />
    </>
  );
}
