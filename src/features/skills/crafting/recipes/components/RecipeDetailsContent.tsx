import RecordLink from "@/components/recordLink/RecordLink";
import ScrollList from "@/components/scrollList/ScrollList";
import { components } from "@/types/api";

export default function RecipeDetailsContent({
  record,
}: {
  record: components["schemas"]["CraftingRecipeEntity"];
}) {
  return (
    <>
      <p className="text-xl">Id: {record.id}</p>
      <ScrollList
        basePath="items/resources/variants"
        items={record.inputResourceVariants}
        title="Input Resource Variants"
      />
      <ScrollList
        basePath="items/misc"
        items={record.inputItems}
        title="Input Misc Items"
      />
      {record.outputConsumableVariant && (
        <div className="flex gap-3 items-center">
          <p className="text-xl">Output Consumable Variant: </p>
          <RecordLink
            recordBasePath="/items/consumables/variants"
            recordId={record.outputConsumableVariant.id}
            recordName={`${record.outputConsumableVariant.name} ${record.outputConsumableVariant.consumable.name}`}
          />
        </div>
      )}
      {record.outputArmorVariant && (
        <div className="flex gap-3 items-center">
          <p className="text-xl">Output Armor Variant: </p>
          <RecordLink
            recordBasePath="/items/consumables/variants"
            recordId={record.outputArmorVariant.id}
            recordName={`${record.outputArmorVariant.name} ${record.outputArmorVariant.armor.name}`}
          />
        </div>
      )}
      {record.outputWeaponVariant && (
        <div className="flex gap-3 items-center">
          <p className="text-xl">Output Weapon Variant: </p>
          <RecordLink
            recordBasePath="/items/consumables/variants"
            recordId={record.outputWeaponVariant.id}
            recordName={`${record.outputWeaponVariant.name} ${record.outputWeaponVariant.weapon.name}`}
          />
        </div>
      )}
      {!record.outputConsumableVariant &&
        !record.outputArmorVariant &&
        !record.outputWeaponVariant && (
          <p className="text-xl">No output has been assigned.</p>
        )}
      {[
        record.outputArmorVariant,
        record.outputWeaponVariant,
        record.outputConsumableVariant,
      ].filter(Boolean).length > 1 && (
        <p className="text-2xl text-destructive">
          More than one output assigned. This is likely a mistake!
        </p>
      )}
    </>
  );
}
