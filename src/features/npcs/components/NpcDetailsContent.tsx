import RecordLink from "@/components/recordLink/RecordLink";
import ScrollList from "@/components/scrollList/ScrollList";
import { components } from "@/types/api";

export default function NpcDetailsContent({
  record,
}: {
  record: components["schemas"]["NpcEntity"];
}) {
  return (
    <>
      <p className="text-xl">Id: {record.id}</p>
      {record.vendor ? (
        <div className="flex gap-3 items-center">
          <p className="text-xl">Vendor: </p>
          <RecordLink
            recordBasePath="/npcs/vendors"
            recordId={record.vendor.id}
            recordName={`Id: ${record.vendor.id.toString()}`}
          />
        </div>
      ) : (
        <p>Vendor: Not Assigned</p>
      )}
      <ScrollList
        basePath="quests/steps"
        items={record.questSteps}
        title="Quest Steps"
      />
    </>
  );
}
