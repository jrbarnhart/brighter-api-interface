import RecordLink from "@/components/recordLink/RecordLink";
import ScrollList from "@/components/scrollList/ScrollList";
import { components } from "@/types/api";

export default function VendorDetailsContent({
  record,
}: {
  record: components["schemas"]["VendorEntity"];
}) {
  return (
    <>
      <p className="text-xl">Id: {record.id}</p>

      <p className="text-xl">Name: {record.name || "Not set"}</p>

      <div className="flex gap-3 items-center">
        <p className="text-xl">NPC: </p>
        <RecordLink
          recordBasePath="/npcs"
          recordId={record.npc.id}
          recordName={record.npc.name}
        />
      </div>
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
        basePath="items/weapons/variants"
        items={record.weaponVariants}
        title="Weapon Variants"
      />
      <ScrollList
        basePath="items/armors/variants"
        items={record.armorVariants}
        title="Armors Variants"
      />
      <ScrollList
        basePath="items/misc"
        items={record.miscItems}
        title="Misc Items"
      />
    </>
  );
}
