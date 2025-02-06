import RecordLink from "@/components/recordLink/RecordLink";
import { components } from "@/types/api";

export default function QuestStepDetailsContent({
  record,
}: {
  record: components["schemas"]["QuestStepEntity"];
}) {
  return (
    <>
      <p className="text-xl">Id: {record.id}</p>
      <p className="text-xl">Index: {record.index}</p>
      <div className="flex gap-3 items-center">
        <p className="text-xl">Quest: </p>
        <RecordLink
          recordBasePath="/quests"
          recordId={record.quest.id}
          recordName={record.quest.name}
        />
      </div>
      <p className="text-xl">Description: {record.description}</p>
      {record.room ? (
        <div className="flex gap-3 items-center">
          <p className="text-xl">Room: </p>
          <RecordLink
            recordBasePath="/rooms"
            recordId={record.room.id}
            recordName={record.room.name}
          />
        </div>
      ) : (
        <p className="text-xl">Room: None</p>
      )}
      {record.npc ? (
        <div className="flex gap-3 items-center">
          <p className="text-xl">Npc: </p>
          <RecordLink
            recordBasePath="/npcs"
            recordId={record.npc.id}
            recordName={record.npc.name}
          />
        </div>
      ) : (
        <p className="text-xl">Npc: None</p>
      )}
    </>
  );
}
