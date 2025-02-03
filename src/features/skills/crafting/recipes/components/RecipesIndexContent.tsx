import RecordLink from "@/components/recordLink/RecordLink";
import { components } from "@/types/api";

export default function RecipesIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["CraftingRecipeEntity"][];
  gridColsRule: string;
}) {
  return data.map((recipe) => (
    <div
      className={`grid ${gridColsRule} items-center p-2 even:bg-secondary/60`}
      key={recipe.id}
    >
      <RecordLink
        recordBasePath="/skills/crafting/recipes"
        recordId={recipe.id}
        recordName={recipe.name}
      />
      <p>{recipe.id}</p>
      <p>{recipe.inputResourceVariants.length}</p>
      <p>{recipe.inputItems.length}</p>
      {recipe.outputConsumableVariant && (
        <RecordLink
          recordBasePath="items/consumables/variants"
          recordId={recipe.outputConsumableVariant.id}
          recordName={`${recipe.outputConsumableVariant.name} ${recipe.outputConsumableVariant.consumable.name}`}
        />
      )}
      {recipe.outputArmorVariant && (
        <RecordLink
          recordBasePath="items/armors/variants"
          recordId={recipe.outputArmorVariant.id}
          recordName={`${recipe.outputArmorVariant.name} ${recipe.outputArmorVariant.armor.name}`}
        />
      )}
      {recipe.outputWeaponVariant && (
        <RecordLink
          recordBasePath="items/weapons/variants"
          recordId={recipe.outputWeaponVariant.id}
          recordName={`${recipe.outputWeaponVariant.name} ${recipe.outputWeaponVariant.weapon.name}`}
        />
      )}
    </div>
  ));
}
