import RecordLink from "@/components/recordLink/RecordLink";
import { components } from "@/types/api";

export default function CraftingSkillRequirementsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["CraftingSkillRequirementEntity"][];
  gridColsRule: string;
}) {
  return data.map((req) => (
    <div
      className={`grid ${gridColsRule} items-center p-2 even:bg-secondary/60`}
      key={req.id}
    >
      <RecordLink
        recordBasePath="/skills/crafting/requirements"
        recordId={req.id}
        recordName={req.id.toString()}
      />
      <p>{req.unlockLevel}</p>
      <p className="truncate">{req.description}</p>
      {req.recipe && (
        <RecordLink
          recordBasePath="/monsters/variants"
          recordId={req.recipe.id}
          recordName={req.recipe.name}
        />
      )}
    </div>
  ));
}
