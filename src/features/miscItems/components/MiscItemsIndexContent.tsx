import RecordLink from "@/components/recordLink/RecordLink";
import { components } from "@/types/api";

export default function MiscItemsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["MiscItemEntity"][];
  gridColsRule: string;
}) {
  return data.map((miscItem) => {
    return (
      <div
        className={`grid ${gridColsRule} items-center p-2 even:bg-secondary/60`}
        key={miscItem.id}
      >
        <RecordLink
          recordBasePath="/items/misc"
          recordId={miscItem.id}
          recordName={miscItem.name}
        />
        <p>{miscItem.id}</p>
        <p>{miscItem.inRecipes.length}</p>
        <p>{miscItem.vendors.length}</p>
        <p>{miscItem.dropTables.length}</p>
      </div>
    );
  });
}
