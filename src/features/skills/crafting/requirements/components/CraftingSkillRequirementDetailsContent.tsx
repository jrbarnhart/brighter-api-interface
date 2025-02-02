import RecordLink from "@/components/recordLink/RecordLink";
import { components } from "@/types/api";

export default function CraftingSkillRequirementDetailsContent({
  record,
}: {
  record: components["schemas"]["CraftingSkillRequirementEntity"];
}) {
  return (
    <>
      <p className="text-xl">Id: {record.id}</p>
      <div className="flex gap-3 items-center">
        <p className="text-xl">Skill: </p>
        <RecordLink
          recordBasePath="/skills/crafting"
          recordId={record.skillId}
          recordName={record.skill.name}
        />
      </div>
      {record.description && <p>Description: {record.description}</p>}
      {record.recipe && (
        <div className="flex gap-3 items-center">
          <p className="text-xl">Recipe: </p>
          <RecordLink
            recordBasePath="/monsterse/variants"
            recordId={record.recipe.id}
            recordName={record.recipe.name}
          />
        </div>
      )}
    </>
  );
}
