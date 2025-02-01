import RecordLink from "@/components/recordLink/RecordLink";
import ScrollList from "@/components/scrollList/ScrollList";
import { components } from "@/types/api";

export default function RoomDetailsContent({
  record,
}: {
  record: components["schemas"]["RoomEntity"];
}) {
  return (
    <>
      <p className="text-xl">Id: {record.id}</p>
      <div className="flex gap-3 items-center">
        <p className="text-xl">Region: </p>
        <RecordLink
          recordBasePath="/regions"
          recordId={record.region.id}
          recordName={record.region.name}
        />
      </div>
      {record.portal ? <p>Is Portal Room ✅</p> : <p>Is not Portal room ❌</p>}
      {record.obelisk ? (
        <p>Is Obelisk Room ✅</p>
      ) : (
        <p>Is not Obelisk room ❌</p>
      )}
      <div>
        <p>Banks:</p>
        <ul className="list-disc list-inside">
          {record.banks.length <= 0 ? (
            <li>None</li>
          ) : (
            record.banks.map((bank, index) => (
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
        items={record.craftingSkills}
      />
      <ScrollList
        basePath="monsters"
        title="Monsters"
        items={record.monsters}
      />
      <ScrollList basePath="npcs" title="NPC's" items={record.npcs} />
      <ScrollList
        basePath="resources"
        title="Resource Nodes"
        items={record.resources}
      />
      <ScrollList
        basePath="quests/steps"
        title="QuestSteps"
        items={record.questSteps}
      />
    </>
  );
}
