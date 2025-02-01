import ScrollList from "@/components/scrollList/ScrollList";
import { components } from "@/types/api";

export default function RegionDetailsContent({
  record,
}: {
  record: components["schemas"]["RegionEntity"];
}) {
  return (
    <>
      <p className="text-xl">Id: {record.id}</p>
      <ScrollList basePath="rooms" title="Rooms" items={record.rooms} />
      <ScrollList
        basePath="skills/combat"
        title="Combat Skills"
        items={record.combatSkills}
      />
      <ScrollList
        basePath="skills/gathering"
        title="Gathering Skills"
        items={record.gatheringSkills}
      />
      <ScrollList
        basePath="skills/crafting"
        title="Crafting Skills"
        items={record.craftingSkills}
      />
    </>
  );
}
