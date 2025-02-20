import RecordLink from "@/components/recordLink/RecordLink";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { groupDataByRegionId } from "@/lib/dataUtils";
import { components } from "@/types/api";

export default function MonstersIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["MonsterEntity"][];
  gridColsRule: string;
}) {
  const groupedData = groupDataByRegionId(data);

  return groupedData.map((group, index) => {
    return (
      <Collapsible key={index} defaultOpen={true}>
        <CollapsibleTrigger asChild>
          <p className="select-none p-2 text-lg bg-border">
            {group[0]?.region.name ?? "Group Name"}
          </p>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {group.map((monster) => (
            <div
              className={`grid ${gridColsRule} items-center p-2 even:bg-secondary/60`}
              key={monster.id}
            >
              <RecordLink
                recordBasePath="/monsters"
                recordId={monster.id}
                recordName={monster.name}
              />
              <p>{monster.id}</p>
              <p>{monster.passive && "✅"}</p>
              <p className="truncate">{monster.attackElement}</p>
              <p className="truncate">{monster.immuneElement}</p>
              <p className="truncate">{monster.vulnerableElement}</p>
              <p>{monster.rooms.length}</p>
              <p>{monster.variants.length}</p>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  });
}
