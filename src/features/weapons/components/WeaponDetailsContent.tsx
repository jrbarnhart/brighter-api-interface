import ScrollList from "@/components/scrollList/ScrollList";
import { components } from "@/types/api";

export default function WeaponDetailsContent({
  record,
}: {
  record: components["schemas"]["WeaponEntity"];
}) {
  return (
    <>
      <p className="text-xl">Id: {record.id}</p>
      <p className="text-xl">Faction: {record.faction}</p>
      <p className="text-xl">Element: {record.element}</p>
      <p className="text-xl">2-Handed: {record.isTwoHanded ? "✅" : "❌"}</p>
      <p className="text-xl">Ranged: {record.isRanged ? "✅" : "❌"}</p>
      <ScrollList
        basePath="items/weapons/variants"
        items={record.variants}
        title="Variants"
      />
    </>
  );
}
