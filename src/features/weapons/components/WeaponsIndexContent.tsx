import RecordLink from "@/components/recordLink/RecordLink";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { groupDataByElement } from "@/lib/dataUtils";
import { components } from "@/types/api";

export default function WeaponsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["WeaponEntity"][];
  gridColsRule: string;
}) {
  const groupedData = groupDataByElement(data);

  return groupedData.map((group, index) => {
    return (
      <Collapsible key={index} defaultOpen={true}>
        <CollapsibleTrigger asChild>
          <p className="select-none p-2 text-lg bg-border">
            {group[0]?.faction ?? "Faction Name"}
          </p>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {group.map((weapon) => (
            <div
              className={`grid ${gridColsRule} items-center p-2 even:bg-secondary/60`}
              key={weapon.id}
            >
              <RecordLink
                recordBasePath="/items/weapons"
                recordId={weapon.id}
                recordName={weapon.name}
              />
              <p>{weapon.id}</p>
              <p>{weapon.element}</p>
              <p>{weapon.isTwoHanded && "✅"}</p>
              <p>{weapon.isRanged && "✅"}</p>
              <p>{weapon.variants.length}</p>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  });
}
