import ScrollList from "@/components/scrollList/ScrollList";
import { components } from "@/types/api";

export default function ArmorDetailsContent({
  record,
}: {
  record: components["schemas"]["ArmorEntity"];
}) {
  return (
    <>
      <p className="text-xl">Id: {record.id}</p>
      <p className="text-xl">Faction: {record.faction}</p>
      <p className="text-xl">Slot: {record.slot}</p>
      <ScrollList
        basePath="items/armors/variants"
        items={record.variants}
        title="Variants"
      />
    </>
  );
}
