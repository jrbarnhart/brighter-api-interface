import RecordLink from "@/components/recordLink/RecordLink";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { groupWeaponVariantsByFactionAndBase } from "@/lib/dataUtils";

import { components } from "@/types/api";

export default function WeaponVariantsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["WeaponVariantEntity"][];
  gridColsRule: string;
}) {
  const groupedData = groupWeaponVariantsByFactionAndBase(data);

  return (
    <>
      {Object.keys(groupedData).map((skillName) => (
        <Collapsible key={skillName} defaultOpen={true}>
          <CollapsibleTrigger asChild>
            <p className="select-none p-2 text-lg bg-border">{skillName}</p>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {Object.keys(groupedData[skillName] || {}).map((weaponName) => (
              <Collapsible key={weaponName} defaultOpen={true}>
                <CollapsibleTrigger asChild>
                  <p className="select-none p-2 text-base bg-border/50">
                    {weaponName}
                  </p>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {(groupedData[skillName]?.[weaponName] || []).map(
                    (variant) => (
                      <div
                        className={`grid ${gridColsRule} items-center p-2 even:bg-secondary/60`}
                        key={variant.id}
                      >
                        <RecordLink
                          recordBasePath="/items/weapons/variants"
                          recordId={variant.id}
                          recordName={`${variant.name} ${variant.weapon.name}`}
                        />
                        {variant.recipe ? (
                          <RecordLink
                            recordBasePath="/skills/crafting/recipes"
                            recordId={variant.recipe.id}
                            recordName={variant.recipe.name}
                          />
                        ) : (
                          <p>Not assigned</p>
                        )}
                        <p>{variant.id}</p>
                        <p>{variant.vendors.length}</p>
                        <p>{variant.dropTables.length}</p>
                      </div>
                    )
                  )}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </>
  );
}
