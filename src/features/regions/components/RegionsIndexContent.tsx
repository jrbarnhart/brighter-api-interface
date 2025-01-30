import RecordLink from "@/components/recordLink/RecordLink";
import { components } from "@/types/api";

export default function RegionsIndexContent({
  data,
  gridColsRule,
}: {
  data: components["schemas"]["RegionEntity"][];
  gridColsRule: string;
}) {
  return data.map((region) => (
    <div
      className={`grid ${gridColsRule} items-center p-2 even:bg-secondary/60`}
      key={region.id}
    >
      <RecordLink
        recordBasePath="/regions"
        recordId={region.id}
        recordName={region.name}
      />
      <p>{region.id}</p>
      <p>
        {`Cb: ${region.combatSkills.length.toString()} - G: ${region.gatheringSkills.length.toString()} - Cr: ${region.craftingSkills.length.toString()}`}
      </p>
      <p>{region.rooms.length}</p>
    </div>
  ));
}
