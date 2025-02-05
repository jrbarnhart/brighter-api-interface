import RecordLink from "@/components/recordLink/RecordLink";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { groupDataBySkillId } from "@/lib/dataUtils";
import { components } from "@/types/api";

export default function ResourcesIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["ResourceEntity"][];
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
          {group.map((resource) => (
            <div
              className={`grid ${gridColsRule} items-center p-2 even:bg-secondary/60`}
              key={resource.id}
            >
              <RecordLink
                recordBasePath="/items/resources"
                recordId={resource.id}
                recordName={resource.name}
              />
              <p>{resource.id}</p>
              <p>{resource.passive && "✅"}</p>
              <p>{resource.rooms.length}</p>
              <p>{resource.variants.length}</p>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  });
}
