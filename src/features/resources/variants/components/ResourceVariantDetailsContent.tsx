import RecordLink from "@/components/recordLink/RecordLink";
import ScrollList from "@/components/scrollList/ScrollList";
import { components } from "@/types/api";

export default function ResourceVariantDetailsContent({
  record,
}: {
  record: components["schemas"]["ResourceVariantEntity"];
}) {
  return (
    <>
      <div className="flex gap-3 items-center">
        <p className="text-xl">Base: </p>
        <RecordLink
          recordBasePath="/items/resources"
          recordId={record.resourceId}
          recordName={record.resource.name}
        />
      </div>

      <p className="text-xl">Id: {record.id}</p>

      <div className="flex gap-3 items-center">
        <p className="text-xl">Skill: </p>
        <RecordLink
          recordBasePath="/skills/gathering"
          recordId={record.resource.skillId}
          recordName={record.resource.skill.name}
        />
      </div>

      {record.requirement ? (
        <div className="flex gap-3 items-center">
          <p className="text-xl">Skill Requirement: </p>
          <RecordLink
            recordBasePath="/skills/gathering/requirements"
            recordId={record.requirement.id}
            recordName={`Lvl: ${record.requirement.unlockLevel.toString()}`}
          />
        </div>
      ) : (
        <p className="text-xl">Not assigned to requirement.</p>
      )}

      <ScrollList
        basePath="skills/crafting/recipes"
        items={record.inRecipes}
        title="In Recipes"
      />

      <ScrollList
        basePath="npcs/vendors"
        items={record.vendors}
        title="Vendors"
      />

      <ScrollList
        basePath="monsters/drop-tables"
        items={record.dropTables}
        title="In Drop Tables"
      />
    </>
  );
}
