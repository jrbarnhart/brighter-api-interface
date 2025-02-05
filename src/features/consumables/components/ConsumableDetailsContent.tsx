import RecordLink from "@/components/recordLink/RecordLink";
import ScrollList from "@/components/scrollList/ScrollList";
import { components } from "@/types/api";

export default function ConsumableDetailsContent({
  record,
}: {
  record: components["schemas"]["ConsumableEntity"];
}) {
  return (
    <>
      <p className="text-xl">Id: {record.id}</p>

      <div className="flex gap-3 items-center">
        <p className="text-xl">Skill: </p>
        {record.skill ? (
          <RecordLink
            recordBasePath="/skills/crafting"
            recordId={record.skill.id}
            recordName={record.skill.name}
          />
        ) : (
          <p>None</p>
        )}
      </div>
      <ScrollList
        basePath="items/consumables/variants"
        items={record.variants}
        title="Variants"
      />
    </>
  );
}
