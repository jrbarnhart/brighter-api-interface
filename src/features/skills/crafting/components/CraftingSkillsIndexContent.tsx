import RecordLink from "@/components/recordLink/RecordLink";
import { components } from "@/types/api";

export default function CraftingSkillsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["CraftingSkillEntity"][];
  gridColsRule: string;
}) {
  return data.map((skill) => (
    <div
      className={`grid ${gridColsRule} items-center p-2 even:bg-secondary/60`}
      key={skill.id}
    >
      <RecordLink
        recordBasePath="/skills/crafting"
        recordId={skill.id}
        recordName={skill.name}
      />
      <RecordLink
        recordBasePath="/regions"
        recordId={skill.region.id}
        recordName={skill.region.name}
      />
      <p>{skill.id}</p>
      <p>{skill.rooms.length}</p>
      <p>{skill.requirements.length}</p>
      <p>{skill.consumables.length}</p>
    </div>
  ));
}
