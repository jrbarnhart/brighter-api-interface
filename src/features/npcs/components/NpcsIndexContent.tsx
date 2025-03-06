import RecordLink from "@/components/recordLink/RecordLink";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { groupDataByAlpha } from "@/lib/dataUtils";
import { components } from "@/types/api";

export default function NpcsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["NpcEntity"][];
  gridColsRule: string;
}) {
  const groupedData = groupDataByAlpha(data);

  return groupedData.map((group, index) => (
    <Collapsible key={index} defaultOpen={true}>
      <CollapsibleTrigger asChild>
        <p className="select-none p-2 text-lg bg-border">
          {group[0]?.name[0]?.toUpperCase() ?? "*"}
        </p>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {group.map((npc) => (
          <div
            className={`grid ${gridColsRule} gap-2 items-center p-2 even:bg-secondary/60`}
            key={npc.id}
          >
            <RecordLink
              recordBasePath="/npcs"
              recordId={npc.id}
              recordName={npc.name}
            />
            <p>{npc.id}</p>
            {npc.vendor ? (
              <RecordLink
                recordBasePath="/npcs/vendors"
                recordId={npc.vendor.id}
                recordName={`Id: ${npc.vendor.id.toString()}`}
              />
            ) : (
              <p>Not Set</p>
            )}
            <p>{npc.questSteps.length}</p>
            <p>{npc.rooms.length}</p>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  ));
}
