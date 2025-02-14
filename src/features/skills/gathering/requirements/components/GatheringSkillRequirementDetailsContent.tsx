import RecordLink from "@/components/recordLink/RecordLink";
import { components } from "@/types/api";

export default function GatheringSkillRequirementDetailsContent({
  record,
}: {
  record: components["schemas"]["GatheringSkillRequirementEntity"];
}) {
  return (
    <>
      <p className="text-xl">Id: {record.id}</p>
      <div className="flex gap-3 items-center">
        <p className="text-xl">Skill: </p>
        <RecordLink
          recordBasePath="/skills/gathering"
          recordId={record.skillId}
          recordName={record.skill.name}
        />
      </div>
      <p className="text-xl">Description: {record.description}</p>

      <div className="flex gap-3 items-center">
        <p className="text-xl">Resource Variant: </p>
        {record.resourceVariant ? (
          <RecordLink
            recordBasePath="/items/resources/variants"
            recordId={record.resourceVariant.id}
            recordName={`${record.resourceVariant.name} ${record.resourceVariant.resource.name}`}
          />
        ) : (
          <p className="text-xl">Not set</p>
        )}
      </div>
    </>
  );
}
