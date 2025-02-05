import RecordLink from "@/components/recordLink/RecordLink";
import ScrollList from "@/components/scrollList/ScrollList";
import { components } from "@/types/api";

export default function WeaponVariantDetailsContent({
  record,
}: {
  record: components["schemas"]["WeaponVariantEntity"];
}) {
  return (
    <>
      <div className="flex gap-3 items-center">
        <p className="text-xl">Base: </p>
        <RecordLink
          recordBasePath="/items/weapons"
          recordId={record.weaponId}
          recordName={record.weapon.name}
        />
      </div>

      <p className="text-xl">Id: {record.id}</p>

      <div className="flex gap-3 items-center">
        <p className="text-xl">Recipe: </p>
        {record.recipe ? (
          <RecordLink
            recordBasePath="/skills/gathering/requirements"
            recordId={record.recipe.id}
            recordName={record.recipe.name}
          />
        ) : (
          <p className="text-xl">Not assigned</p>
        )}
      </div>

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
