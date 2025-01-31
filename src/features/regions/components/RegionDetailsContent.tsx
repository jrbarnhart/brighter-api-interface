import ScrollList from "@/components/scrollList/ScrollList";
import { components } from "@/types/api";

export default function RegionDetailsContent(
  region: components["schemas"]["RegionEntity"]
) {
  return (
    <>
      <p className="text-xl">Id: {region.id}</p>
      <ScrollList basePath="rooms" title="Rooms" items={region.rooms} />
      <ScrollList
        basePath="skills/combat"
        title="Combat Skills"
        items={region.combatSkills}
      />
      <ScrollList
        basePath="skills/gathering"
        title="Gathering Skills"
        items={region.gatheringSkills}
      />
      <ScrollList
        basePath="skills/crafting"
        title="Crafting Skills"
        items={region.craftingSkills}
      />
    </>
  );
}
