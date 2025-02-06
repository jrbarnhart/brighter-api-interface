import RecordLink from "@/components/recordLink/RecordLink";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { groupDataByQuestName } from "@/lib/dataUtils";
import { components } from "@/types/api";

export default function QuestStepsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["QuestStepEntity"][];
  gridColsRule: string;
}) {
  const groupedData = groupDataByQuestName(data);

  return groupedData.map((group, index) => {
    return (
      <Collapsible key={index} defaultOpen={true}>
        <CollapsibleTrigger asChild>
          <p className="select-none p-2 text-lg bg-border">
            {group[0]?.quest.name ?? "Group Name"}
          </p>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {group.map((questStep) => (
            <div
              className={`grid ${gridColsRule} items-center p-2 even:bg-secondary/60`}
              key={questStep.id}
            >
              <RecordLink
                recordBasePath="/quests/steps"
                recordId={questStep.id}
                recordName={`# ${questStep.index.toString()}`}
              />
              <p>{questStep.id}</p>
              <p>{questStep.description}</p>
              {questStep.room ? (
                <RecordLink
                  recordBasePath="/rooms"
                  recordId={questStep.room.id}
                  recordName={questStep.room.name}
                />
              ) : null}
              {questStep.npc ? (
                <RecordLink
                  recordBasePath="/npcs"
                  recordId={questStep.npc.id}
                  recordName={questStep.npc.name}
                />
              ) : null}
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  });
}
