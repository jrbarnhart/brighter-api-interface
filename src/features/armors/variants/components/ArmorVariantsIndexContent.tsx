import RecordLink from "@/components/recordLink/RecordLink";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { groupArmorVariantsByFactionSlotAndBase } from "@/lib/dataUtils";

import { components } from "@/types/api";

export default function ArmorVariantsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["ArmorVariantEntity"][];
  gridColsRule: string;
}) {
  const groupedData = groupArmorVariantsByFactionSlotAndBase(data);

  return (
    <>
      {Object.keys(groupedData).map((faction) => (
        <Collapsible key={faction} defaultOpen={true}>
          <CollapsibleTrigger asChild>
            <p className="select-none p-2 text-lg bg-border">{faction}</p>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {Object.keys(groupedData[faction] || {}).map((slot) => (
              <Collapsible key={slot} defaultOpen={true}>
                <CollapsibleTrigger asChild>
                  <p className="select-none p-2 text-base bg-border/50">
                    {slot}
                  </p>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {groupedData[faction] &&
                    Object.keys(groupedData[faction][slot] || {}).map(
                      (armorName) => (
                        <Collapsible key={armorName} defaultOpen={true}>
                          <CollapsibleTrigger asChild>
                            <p className="select-none p-2 text-base bg-secondary/50">
                              {armorName}
                            </p>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            {groupedData[faction] &&
                              groupedData[faction][slot] &&
                              (groupedData[faction][slot][armorName] || []).map(
                                (variant) => (
                                  <div
                                    className={`grid ${gridColsRule} items-center p-2 even:bg-secondary/60`}
                                    key={variant.id}
                                  >
                                    <RecordLink
                                      recordBasePath="/items/armors/variants"
                                      recordId={variant.id}
                                      recordName={`${variant.name} ${variant.armor.name}`}
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

// {(groupedData[faction]?.[armorName] || []).map(
//   (variant) => (
//     <div
//       className={`grid ${gridColsRule} items-center p-2 even:bg-secondary/60`}
//       key={variant.id}
//     >
//       <RecordLink
//         recordBasePath="/items/armors/variants"
//         recordId={variant.id}
//         recordName={`${variant.name} ${variant.armor.name}`}
//       />
//       {variant.recipe ? (
//         <RecordLink
//           recordBasePath="/skills/crafting/recipes"
//           recordId={variant.recipe.id}
//           recordName={variant.recipe.name}
//         />
//       ) : (
//         <p>Not assigned</p>
//       )}
//       <p>{variant.id}</p>
//       <p>{variant.vendors.length}</p>
//       <p>{variant.dropTables.length}</p>
//     </div>
//   )
// )}
