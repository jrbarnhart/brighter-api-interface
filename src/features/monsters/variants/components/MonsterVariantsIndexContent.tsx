import RecordLink from "@/components/recordLink/RecordLink";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { groupMonsterVariantsBySkillAndBase } from "@/lib/dataUtils";
import { components } from "@/types/api";

export default function MonsterVariantsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["MonsterVariantEntity"][];
  gridColsRule: string;
}) {
  const groupedData = groupMonsterVariantsBySkillAndBase(data);

  return (
    <>
      {Object.keys(groupedData).map((skillName) => (
        <Collapsible key={skillName} defaultOpen={true}>
          <CollapsibleTrigger asChild>
            <p className="select-none p-2 text-lg bg-border">{skillName}</p>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {Object.keys(groupedData[skillName] || {}).map((monsterName) => (
              <Collapsible key={monsterName} defaultOpen={true}>
                <CollapsibleTrigger asChild>
                  <p className="select-none p-2 text-base bg-border/50">
                    {monsterName}
                  </p>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {(groupedData[skillName]?.[monsterName] || []).map(
                    (variant) => (
                      <div
                        className={`grid ${gridColsRule} items-center p-2 even:bg-secondary/60`}
                        key={variant.id}
                      >
                        <RecordLink
                          recordBasePath="/monsters/variants"
                          recordId={variant.id}
                          recordName={`${variant.name} ${variant.monster.name}`}
                        />
                        {variant.requirement ? (
                          <RecordLink
                            recordBasePath="/skills/combat/requirements"
                            recordId={variant.requirement.id}
                            recordName={`Lvl: ${variant.requirement.unlockLevel.toString()}`}
                          />
                        ) : (
                          <p>Not assigned</p>
                        )}
                        <p>{variant.id}</p>
                        {variant.dropTable ? (
                          <RecordLink
                            recordBasePath="/skills/combat/requirements"
                            recordId={variant.dropTable.id}
                            recordName={`Id: ${variant.dropTable.id.toString()}`}
                          />
                        ) : (
                          <p>Not assigned</p>
                        )}
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
