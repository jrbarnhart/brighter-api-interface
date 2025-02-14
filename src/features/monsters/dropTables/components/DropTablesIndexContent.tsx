import RecordLink from "@/components/recordLink/RecordLink";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { groupDataByMonsterVariantMonster } from "@/lib/dataUtils";
import { components } from "@/types/api";

export default function DropTablesIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["DropTableEntity"][];
  gridColsRule: string;
}) {
  const groupedData = groupDataByMonsterVariantMonster(data);
  return groupedData.map((group, index) => {
    return (
      <Collapsible key={index} defaultOpen={true}>
        <CollapsibleTrigger asChild>
          <p className="select-none p-2 text-lg bg-border">
            {group[0]?.monsterVariant.monster.name ?? "Monster Name"}
          </p>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {group.map((dropTable) => (
            <div
              className={`grid ${gridColsRule} items-center p-2 even:bg-secondary/60`}
              key={dropTable.id}
            >
              <RecordLink
                recordBasePath="/monsters/drop-tables"
                recordId={dropTable.id}
                recordName={dropTable.id.toString()}
              />
              <RecordLink
                recordBasePath="/monsters/variants"
                recordId={dropTable.monsterVariant.id}
                recordName={`${dropTable.monsterVariant.name} ${dropTable.monsterVariant.monster.name}`}
              />
              <p>{dropTable.resourceVariants.length}</p>
              <p>{dropTable.consumableVariants.length}</p>
              <p>{dropTable.miscItems.length}</p>
              <p>{dropTable.weaponVariants.length}</p>
              <p>{dropTable.armorVariants.length}</p>
              <p>{dropTable.currency ?? "0"}</p>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  });
}
