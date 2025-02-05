import RecordLink from "@/components/recordLink/RecordLink";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { groupDataByWeaponName } from "@/lib/dataUtils";

import { components } from "@/types/api";

export default function WeaponVariantsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["WeaponVariantEntity"][];
  gridColsRule: string;
}) {
  const groupedData = groupDataByWeaponName(data);

  return groupedData.map((group, index) => {
    return (
      <Collapsible key={index} defaultOpen={true}>
        <CollapsibleTrigger asChild>
          <p className="select-none p-2 text-lg bg-border">
            {group[index]?.weapon.name ?? "No Weapon"}
          </p>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {group.map((variant) => (
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
                  recordId={variant.id}
                  recordName={variant.name}
                />
              ) : (
                <p>Not assigned</p>
              )}
              <p>{variant.id}</p>
              <p>{variant.vendors.length}</p>
              <p>{variant.dropTables.length}</p>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  });
}
