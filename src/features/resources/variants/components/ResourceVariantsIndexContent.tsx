import RecordLink from "@/components/recordLink/RecordLink";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { groupResourceVariantsBySkillAndBase } from "@/lib/dataUtils";
import { components } from "@/types/api";

export default function ResourceVariantsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["ResourceVariantEntity"][];
  gridColsRule: string;
}) {
  const groupedData = groupResourceVariantsBySkillAndBase(data);

  return (
    <>
      {Object.keys(groupedData).map((skillName) => (
        <Collapsible key={skillName} defaultOpen={true}>
          <CollapsibleTrigger asChild>
            <p className="select-none p-2 text-lg bg-border">{skillName}</p>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {Object.keys(groupedData[skillName] || {}).map((resourceName) => (
              <Collapsible key={resourceName} defaultOpen={true}>
                <CollapsibleTrigger asChild>
                  <p className="select-none p-2 text-base bg-border/50">
                    {resourceName}
                  </p>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {(groupedData[skillName]?.[resourceName] || []).map(
                    (variant) => (
                      <div
                        className={`grid ${gridColsRule} items-center p-2 even:bg-secondary/60`}
                        key={variant.id}
                      >
                        <RecordLink
                          recordBasePath="/items/resources/variants"
                          recordId={variant.id}
                          recordName={`${variant.name} ${variant.resource.name}`}
                        />
                        {variant.requirement ? (
                          <RecordLink
                            recordBasePath="/skills/gathering/requirements"
                            recordId={variant.requirement.id}
                            recordName={`Lvl: ${variant.requirement.unlockLevel.toString()}`}
                          />
                        ) : (
                          <p>Not assigned</p>
                        )}
                        <p>{variant.id}</p>
                        <p>{variant.inRecipes.length}</p>
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
