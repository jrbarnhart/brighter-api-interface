import RecordLink from "@/components/recordLink/RecordLink";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { groupRecipesBySkillId } from "@/lib/dataUtils";
import { components } from "@/types/api";

export default function RecipesIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["CraftingRecipeEntity"][];
  gridColsRule: string;
}) {
  const { grouped, noRequirement } = groupRecipesBySkillId(data);
  const allRecipes = [...grouped, noRequirement];
  return (
    <>
      {allRecipes.map((group, index) => {
        if (group.length <= 0) return null;
        return (
          <Collapsible key={index} defaultOpen={true}>
            <CollapsibleTrigger asChild>
              <p className="select-none p-2 text-lg bg-border">
                {group[0]?.requirement?.skillId ?? "Group Name"}
              </p>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {group.map((recipe) => (
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
              ))}
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </>
  );
}
