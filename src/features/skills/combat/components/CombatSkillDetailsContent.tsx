import RecordLink from "@/components/recordLink/RecordLink";
import ScrollList from "@/components/scrollList/ScrollList";
import { components } from "@/types/api";

export default function CombatSkillDetailsContent({
  record,
}: {
  record: components["schemas"]["CombatSkillEntity"];
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
        basePath="/monsters"
        title="Monsters"
        items={record.monsters}
      />
      <ScrollList
        basePath="/skills/combat/requirements"
        title="Requirements"
        items={record.requirements}
      />
    </>
  );
}
