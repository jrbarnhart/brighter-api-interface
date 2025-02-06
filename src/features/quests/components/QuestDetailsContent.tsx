import ScrollList from "@/components/scrollList/ScrollList";
import { components } from "@/types/api";

export default function QuestDetailsContent({
  record,
}: {
  record: components["schemas"]["QuestEntity"];
}) {
  return (
    <>
      <p className="text-xl">Id: {record.id}</p>

      <ScrollList basePath="quests/steps" items={record.steps} title="Steps" />
    </>
  );
}
