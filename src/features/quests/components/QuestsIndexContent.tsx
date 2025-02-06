import RecordLink from "@/components/recordLink/RecordLink";
import { components } from "@/types/api";

export default function QuestsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["QuestEntity"][];
  gridColsRule: string;
}) {
  return data.map((quest) => (
    <div
      className={`grid ${gridColsRule} gap-2 items-center p-2 even:bg-secondary/60`}
      key={quest.id}
    >
      <RecordLink
        recordBasePath="/quests"
        recordId={quest.id}
        recordName={quest.name}
      />
      <p>{quest.id}</p>
      <p>{quest.steps.length}</p>
    </div>
  ));
}
