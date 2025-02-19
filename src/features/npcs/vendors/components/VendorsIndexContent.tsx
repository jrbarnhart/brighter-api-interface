import RecordLink from "@/components/recordLink/RecordLink";
import { components } from "@/types/api";

export default function VendorsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["VendorEntity"][];
  gridColsRule: string;
}) {
  return data.map((vendor) => (
    <div
      className={`grid ${gridColsRule} gap-2 items-center p-2 even:bg-secondary/60`}
      key={vendor.id}
    >
      <RecordLink
        recordBasePath="/npcs/vendors"
        recordId={vendor.id}
        recordName={`Id: ${vendor.id.toString()}`}
      />
      <RecordLink
        recordBasePath="npcs/"
        recordId={vendor.npc.id}
        recordName={vendor.npc.name}
      />
      <p>{vendor.resourceVariants.length}</p>
      <p>{vendor.consumableVariants.length}</p>
      <p>{vendor.weaponVariants.length}</p>
      <p>{vendor.armorVariants.length}</p>
      <p>{vendor.miscItems.length}</p>
    </div>
  ));
}
