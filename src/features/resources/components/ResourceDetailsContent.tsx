import RecordLink from "@/components/recordLink/RecordLink";
import ScrollList from "@/components/scrollList/ScrollList";
import { components } from "@/types/api";

export default function ResourceDetailsContent({
  record,
}: {
  record: components["schemas"]["ResourceEntity"];
}) {
  return (
    <>
      <p className="text-xl">Id: {record.id}</p>

      <div className="flex gap-3 items-center">
        <p className="text-xl">Skill: </p>
        <RecordLink
          recordBasePath="/skills/gathering"
          recordId={record.skillId}
          recordName={record.skill.name}
        />
      </div>
      <p className="text-xl">Passive: {record.passive ? "✅" : "❌"}</p>
      <ScrollList basePath="rooms" items={record.rooms} title="In Rooms" />
      <ScrollList
        basePath="items/resources/variants"
        items={record.variants}
        title="Variants"
      />
    </>
  );
}
