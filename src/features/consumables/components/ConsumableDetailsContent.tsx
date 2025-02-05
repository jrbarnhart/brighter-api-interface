import ScrollList from "@/components/scrollList/ScrollList";
import { components } from "@/types/api";

export default function ConsumableDetailsContent({
  record,
}: {
  record: components["schemas"]["ConsumableEntity"];
}) {
  return (
    <>
      <p className="text-xl">Id: {record.id}</p>

      <div className="flex gap-3 items-center">
        <p className="text-xl">Skill: </p>
      </div>
      <ScrollList
        basePath="items/consumables/variants"
        items={record.variants}
        title="Variants"
      />
    </>
  );
}
