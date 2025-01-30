import RecordLink from "@/components/recordLink/RecordLink";
import ScrollList from "@/components/scrollList/ScrollList";
import { components } from "@/types/api";

export default function RoomDetailsContents(
  room: components["schemas"]["RoomEntity"]
) {
  return (
    <>
      <p className="text-xl">Id: {room.id}</p>
      <p className="text-xl">
        Region:{" "}
        <RecordLink
          recordBasePath="/regions"
          recordId={room.region.id}
          recordName={room.region.name}
        />
      </p>
      {room.portal ? <p>Is Portal Room ✅</p> : <p>Is not portal room ❌</p>}
      {room.obelisk ? <p>Is Obelisk Room ✅</p> : <p>Is not obelisk room ❌</p>}
      <div>
        <p>Banks:</p>
        <ul className="list-disc list-inside">
          {room.banks.length <= 0 ? (
            <li>None</li>
          ) : (
            room.banks.map((bank, index) => (
              <li key={index}>{`${bank.slice(0, 1)}${bank
                .slice(1)
                .toLowerCase()}`}</li>
            ))
          )}
        </ul>
      </div>
      <ScrollList
        basePath="skills/crafting"
        title="Crafting Skill Spots"
        items={room.craftingSkills}
      />
      <ScrollList basePath="monsters" title="Monsters" items={room.monsters} />
      <ScrollList basePath="npcs" title="NPC's" items={room.npcs} />
      <ScrollList
        basePath="resources"
        title="Resource Nodes"
        items={room.resources}
      />
      <ScrollList
        basePath="quests/steps"
        title="QuestSteps"
        items={room.questSteps}
      />
    </>
  );
}
