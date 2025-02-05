import RecordLink from "@/components/recordLink/RecordLink";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { groupDataByFactionAndSlot } from "@/lib/dataUtils";
import { components } from "@/types/api";

export default function ArmorsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["ArmorEntity"][];
  gridColsRule: string;
}) {
  const groupedData = groupDataByFactionAndSlot(data);

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
                  {(groupedData[faction]?.[slot] || []).map((armor) => (
                    <div
                      className={`grid ${gridColsRule} items-center p-2 even:bg-secondary/60`}
                      key={armor.id}
                    >
                      <RecordLink
                        recordBasePath="/items/armors"
                        recordId={armor.id}
                        recordName={armor.name}
                      />
                      <p>{armor.id}</p>
                      <p>{armor.faction}</p>
                      <p>{armor.variants.length}</p>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </>
  );
}
