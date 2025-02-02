import RecordLink from "@/components/recordLink/RecordLink";
import { components } from "@/types/api";

export default function CombatSkillRequirementsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["CombatSkillRequirementEntity"][];
  gridColsRule: string;
}) {
  return data.map((req) => (
    <div
      className={`grid ${gridColsRule} items-center p-2 even:bg-secondary/60`}
      key={req.id}
    >
      <RecordLink
        recordBasePath="/skills/combat/requirements"
        recordId={req.id}
        recordName={req.id.toString()}
      />
      <p>{req.unlockLevel}</p>
      <p className="truncate">{req.description}</p>
      {req.monsterVariant && (
        <RecordLink
          recordBasePath="/monsters/variants"
          recordId={req.monsterVariant.id}
          recordName={`${req.monsterVariant.name} ${req.monsterVariant.monster.name}`}
        />
      )}
    </div>
  ));
}
