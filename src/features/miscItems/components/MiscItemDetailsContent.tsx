import ScrollList from "@/components/scrollList/ScrollList";
import { components } from "@/types/api";

export default function MiscItemDetailsContent({
  record,
}: {
  record: components["schemas"]["MiscItemEntity"];
}) {
  return (
    <>
      <p className="text-xl">Id: {record.id}</p>

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
        title="Drop Tables"
      />
    </>
  );
}
