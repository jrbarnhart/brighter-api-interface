import RecordLink from "@/components/recordLink/RecordLink";
import { components } from "@/types/api";

export default function ConsumablesIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["ConsumableEntity"][];
  gridColsRule: string;
}) {
  return data.map((consumable) => {
    return (
      <div
        className={`grid ${gridColsRule} items-center p-2 even:bg-secondary/60`}
        key={consumable.id}
      >
        <RecordLink
          recordBasePath="/items/consumables"
          recordId={consumable.id}
          recordName={consumable.name}
        />
        <p>{consumable.id}</p>
        <p>{consumable.variants.length}</p>
      </div>
    );
  });
}
