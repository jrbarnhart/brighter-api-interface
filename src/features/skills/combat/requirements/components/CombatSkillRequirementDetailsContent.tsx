import RecordLink from "@/components/recordLink/RecordLink";
import { components } from "@/types/api";

export default function CombatSkillRequirementDetailsContent({
  record,
}: {
  record: components["schemas"]["CombatSkillRequirementEntity"];
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
      <p className="text-xl">Description: {record.description}</p>

      <div className="flex gap-3 items-center">
        <p className="text-xl">Monster Variant: </p>
        {record.monsterVariant ? (
          <RecordLink
            recordBasePath="/monsters/variants"
            recordId={record.monsterVariant.id}
            recordName={`${record.monsterVariant.name} ${record.monsterVariant.monster.name}`}
          />
        ) : (
          <p className="text-xl">Not set</p>
        )}
      </div>
    </>
  );
}
