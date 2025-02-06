import RecordLink from "@/components/recordLink/RecordLink";
import { components } from "@/types/api";

export default function MonsterVariantDetailsContent({
  record,
}: {
  record: components["schemas"]["MonsterVariantEntity"];
}) {
  return (
    <>
      <div className="flex gap-3 items-center">
        <p className="text-xl">Base: </p>
        <RecordLink
          recordBasePath="/monsters"
          recordId={record.monsterId}
          recordName={record.monster.name}
        />
      </div>

      <p className="text-xl">Id: {record.id}</p>

      <div className="flex gap-3 items-center">
        <p className="text-xl">Skill: </p>
        <RecordLink
          recordBasePath="/skills/combat"
          recordId={record.monster.skillId}
          recordName={record.monster.skill.name}
        />
      </div>

      {record.requirement ? (
        <div className="flex gap-3 items-center">
          <p className="text-xl">Skill Requirement: </p>
          <RecordLink
            recordBasePath="/skills/combat/requirements"
            recordId={record.requirement.id}
            recordName={`Lvl: ${record.requirement.unlockLevel.toString()}`}
          />
        </div>
      ) : (
        <p className="text-xl">Skill Requirement: Not assigned</p>
      )}

      {record.dropTable ? (
        <div className="flex gap-3 items-center">
          <p className="text-xl">Drop Table: </p>
          <RecordLink
            recordBasePath="/monsters/drop-tables"
            recordId={record.dropTable.id}
            recordName={`Id: ${record.dropTable.id.toString()}`}
          />
        </div>
      ) : (
        <p className="text-xl">Drop Table: Not assigned</p>
      )}
    </>
  );
}
