import RecordLink from "@/components/recordLink/RecordLink";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { groupDataByRegionId } from "@/lib/dataUtils";
import { components } from "@/types/api";

export default function QuestsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["QuestEntity"][];
  gridColsRule: string;
}) {
  const groupedData = groupDataByRegionId(data);

  return groupedData.map((group, index) => (
    <Collapsible key={index} defaultOpen={true}>
      <CollapsibleTrigger asChild>
        <p className="select-none p-2 text-lg bg-border">
          {group[0]?.region.name ?? "Region Name"}
        </p>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {group.map((quest) => (
          <div
            className={`grid ${gridColsRule} gap-2 items-center p-2 even:bg-secondary/60`}
            key={quest.id}
          >
            <RecordLink
              recordBasePath="/quests"
              recordId={quest.id}
              recordName={quest.name}
            />
            <p>{quest.id}</p>
            <p>{quest.steps.length}</p>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  ));
}
