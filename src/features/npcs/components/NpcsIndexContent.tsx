import RecordLink from "@/components/recordLink/RecordLink";
import { components } from "@/types/api";

export default function NpcsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["NpcEntity"][];
  gridColsRule: string;
}) {
  return data.map((npc) => (
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
      {npc.vendor && (
        <RecordLink
          recordBasePath="npcs/vendors"
          recordId={npc.vendor.id}
          recordName={`Id: ${npc.vendor.id.toString()}`}
        />
      )}
      <p>{npc.questSteps.length}</p>
      <p>{npc.rooms.length}</p>
    </div>
  ));
}
