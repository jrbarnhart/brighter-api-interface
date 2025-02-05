import RecordLink from "@/components/recordLink/RecordLink";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { groupDataBySkillId } from "@/lib/dataUtils";
import { components } from "@/types/api";

export default function ConsumablesIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["ConsumableEntity"][];
  gridColsRule: string;
}) {
  const groupedData = groupDataBySkillId(data);

  return groupedData.map((group, index) => {
    return (
      <Collapsible key={index} defaultOpen={true}>
        <CollapsibleTrigger asChild>
          <p className="select-none p-2 text-lg bg-border">
            {group[0]?.skill?.name ?? "No Skill"}
          </p>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {group.map((consumable) => (
            <div
              className={`grid ${gridColsRule} items-center p-2 even:bg-secondary/60`}
              key={consumable.id}
            >
              <RecordLink
                recordBasePath="/items/consumables"
                recordId={consumable.id}
                recordName={consumable.name}
              />
              <p>{consumable.id}</p>
              <p>{consumable.variants.length}</p>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  });
}
