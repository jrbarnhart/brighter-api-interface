import RecordLink from "@/components/recordLink/RecordLink";
import ScrollList from "@/components/scrollList/ScrollList";
import { components } from "@/types/api";

export default function CombatSkillDetailsContent({
  combatSkill,
}: {
  combatSkill: components["schemas"]["CombatSkillEntity"];
}) {
  return (
    <>
      <p className="text-xl">Id: {combatSkill.id}</p>
      <div className="flex gap-3 items-center">
        <p className="text-xl">Region: </p>
        <RecordLink
          recordBasePath="/regions"
          recordId={combatSkill.region.id}
          recordName={combatSkill.region.name}
        />
      </div>
      <ScrollList
        basePath="/monsters"
        title="Monsters"
        items={combatSkill.monsters}
      />
      <ScrollList
        basePath="/skills/combat/requirements"
        title="Requirements"
        items={combatSkill.skillRequirements}
      />
    </>
  );
}
