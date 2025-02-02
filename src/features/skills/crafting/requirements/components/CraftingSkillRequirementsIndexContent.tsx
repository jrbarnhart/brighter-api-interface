import RecordLink from "@/components/recordLink/RecordLink";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { groupReqsBySkillId } from "@/lib/dataUtils";
import { components } from "@/types/api";

export default function CraftingSkillRequirementsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["CraftingSkillRequirementEntity"][];
  gridColsRule: string;
}) {
  const groupedData = groupReqsBySkillId(data);

  return groupedData.map((group, index) => {
    return (
      <Collapsible key={index} defaultOpen={true}>
        <CollapsibleTrigger asChild>
          <p className="select-none p-2 text-lg bg-border">
            {group[0]?.skill.name ?? "Group Name"}
          </p>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {group.map((req) => (
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
                  recordBasePath="/skills/crafting/recipes"
                  recordId={req.recipe.id}
                  recordName={req.recipe.name}
                />
              )}
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  });
}
