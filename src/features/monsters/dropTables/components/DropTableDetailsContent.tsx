import RecordLink from "@/components/recordLink/RecordLink";
import ScrollList from "@/components/scrollList/ScrollList";
import { components } from "@/types/api";

export default function DropTableDetailsContent({
  record,
}: {
  record: components["schemas"]["DropTableEntity"];
}) {
  return (
    <>
      <p className="text-xl">Id: {record.id}</p>

      <div className="flex gap-3 items-center">
        <p className="text-xl">Monster Variant: </p>
        <RecordLink
          recordBasePath="/monsters/variants"
          recordId={record.monsterVariant.id}
          recordName={`${record.monsterVariant.name} ${record.monsterVariant.monster.name}`}
        />
      </div>
      <p className="text-xl">Currency: {record.currency ?? "0"}</p>
      <ScrollList
        basePath="items/resources/variants"
        items={record.resourceVariants}
        title="Resource Variants"
      />
      <ScrollList
        basePath="items/consumables/variants"
        items={record.consumableVariants}
        title="Consumable Variants"
      />
      <ScrollList
        basePath="items/misc"
        items={record.miscItems}
        title="Misc Items"
      />
      <ScrollList
        basePath="items/weapons/variants"
        items={record.weaponVariants}
        title="Weapon Variants"
      />
      <ScrollList
        basePath="items/armors/variants"
        items={record.armorVariants}
        title="Armor Variants"
      />
    </>
  );
}
