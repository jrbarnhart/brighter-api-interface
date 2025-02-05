import RecordLink from "@/components/recordLink/RecordLink";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { groupConsumableVariantsBySkillAndBase } from "@/lib/dataUtils";

import { components } from "@/types/api";

export default function ConsumableVariantsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["ConsumableVariantEntity"][];
  gridColsRule: string;
}) {
  const groupedData = groupConsumableVariantsBySkillAndBase(data);

  return (
    <>
      {Object.keys(groupedData).map((skillName) => (
        <Collapsible key={skillName} defaultOpen={true}>
          <CollapsibleTrigger asChild>
            <p className="select-none p-2 text-lg bg-border">{skillName}</p>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {Object.keys(groupedData[skillName] || {}).map((consumableName) => (
              <Collapsible key={consumableName} defaultOpen={true}>
                <CollapsibleTrigger asChild>
                  <p className="select-none p-2 text-base bg-border/50">
                    {consumableName}
                  </p>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {(groupedData[skillName]?.[consumableName] || []).map(
                    (variant) => (
                      <div
                        className={`grid ${gridColsRule} items-center p-2 even:bg-secondary/60`}
                        key={variant.id}
                      >
                        <RecordLink
                          recordBasePath="/items/consumables/variants"
                          recordId={variant.id}
                          recordName={`${variant.name} ${variant.consumable.name}`}
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
