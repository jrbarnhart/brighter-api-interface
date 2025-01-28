import { Button } from "@/components/ui/button";
import { components } from "@/types/api";
import { Link } from "react-router";

export default function RenderRegions({
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
      <div>
        <Button variant={"link"} className="pl-0" asChild>
          <Link
            to={`/regions/${region.id.toString()}`}
            className="truncate underline"
          >
            {region.name.toString()}
          </Link>
        </Button>
      </div>
      <p>{region.id}</p>
      <p>
        {`Cb: ${region.combatSkills.length.toString()} - G: ${region.gatheringSkills.length.toString()} - Cr: ${region.craftingSkills.length.toString()}`}
      </p>
      <p>{region.rooms.length}</p>
    </div>
  ));
}
