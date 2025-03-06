import RecordLink from "@/components/recordLink/RecordLink";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { groupDataByRegionId } from "@/lib/dataUtils";
import { components } from "@/types/api";

export default function RoomsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["RoomEntity"][];
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
        {group.map((room) => (
          <div
            className={`grid ${gridColsRule} gap-2 items-center p-2 even:bg-secondary/60`}
            key={room.id}
          >
            <RecordLink
              recordBasePath="/rooms"
              recordId={room.id}
              recordName={room.name}
            />
            <p>{room.id}</p>
            <RecordLink
              recordBasePath="/regions"
              recordId={room.region.id}
              recordName={room.region.name}
            />
            <p>{room.portal && "✅"}</p>
            <p>{room.obelisk && "✅"}</p>
            <p>{room.banks.length}</p>
            <p className="truncate">{room.craftingSkills.length}</p>
            <p className="truncate">{room.monsters.length}</p>
            <p className="truncate">{room.npcs.length}</p>
            <p className="truncate">{room.resources.length}</p>
            <p>{room.questSteps.length}</p>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  ));
}
