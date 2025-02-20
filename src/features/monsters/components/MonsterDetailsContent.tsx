import RecordLink from "@/components/recordLink/RecordLink";
import ScrollList from "@/components/scrollList/ScrollList";
import { components } from "@/types/api";

export default function MonsterDetailsContent({
  record,
}: {
  record: components["schemas"]["MonsterEntity"];
}) {
  return (
    <>
      <p className="text-xl">Id: {record.id}</p>
      <div className="flex gap-3 items-center">
        <p className="text-xl">Skill: </p>
        <RecordLink
          recordBasePath="/skills/combat"
          recordId={record.skillId}
          recordName={record.skill.name}
        />
      </div>
      <div className="flex gap-3 items-center">
        <p className="text-xl">Region: </p>
        <RecordLink
          recordBasePath="/regions"
          recordId={record.regionId}
          recordName={record.region.name}
        />
      </div>
      <p className="text-xl">Passive: {record.passive ? "✅" : "❌"}</p>
      <p className="text-xl">Attacks: {record.attackElement}</p>
      <p className="text-xl">Immune: {record.immuneElement}</p>
      <p className="text-xl">Vulnerable: {record.vulnerableElement}</p>
      <ScrollList basePath="rooms" items={record.rooms} title="In Rooms" />
      <ScrollList
        basePath="monsters/variants"
        items={record.variants}
        title="Variants"
      />
    </>
  );
}
