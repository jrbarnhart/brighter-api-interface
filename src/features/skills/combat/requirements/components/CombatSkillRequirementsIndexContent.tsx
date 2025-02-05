import RecordLink from "@/components/recordLink/RecordLink";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { groupDataBySkillId } from "@/lib/dataUtils";
import { components } from "@/types/api";

export default function CombatSkillRequirementsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["CombatSkillRequirementEntity"][];
  gridColsRule: string;
}) {
  const groupedData = groupDataBySkillId(data);

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
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  });
}
