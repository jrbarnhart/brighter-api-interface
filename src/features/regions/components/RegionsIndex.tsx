import { Button } from "@/components/ui/button";
import { paths } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

export default function RegionsIndex() {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const { isLoading, isSuccess, error, data } = useQuery({
    queryKey: ["all-regions"],
    queryFn: (): Promise<{
      data: paths["/regions"]["get"]["responses"]["200"]["content"]["application/json"];
    }> =>
      fetch(`${import.meta.env.VITE_API_URL}/regions`, {
        headers: new Headers(),
      }).then((res) => res.json()),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!isSuccess) {
    return (
      <div>
        <p>There was a problem fetching the Regions data.</p>
      </div>
    );
  }

  const { data: regionsArray } = data;

  return (
    <div className="border border-border">
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] p-2 bg-secondary ">
        <p>Name</p>
        <p>Id</p>
        <p>Skills</p>
        <p>Rooms</p>
      </div>
      <div className="">
        {regionsArray.map((region) => (
          <div
            className="grid grid-cols-[1fr_1fr_1fr_1fr] items-center p-2 even:bg-secondary/60"
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
        ))}
      </div>
    </div>
  );
}
