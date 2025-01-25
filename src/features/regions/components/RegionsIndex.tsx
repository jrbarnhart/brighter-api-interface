import { Button } from "@/components/ui/button";
import { components } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export default function RegionsIndex() {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const { isLoading, isSuccess, error, data } = useQuery({
    queryKey: ["allRegions"],
    queryFn: (): Promise<{ data: components["schemas"]["RegionEntity"][] }> =>
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

  const { data: payload } = data;

  return (
    <div className="h-[800px] border border-border">
      <div className="grid grid-cols-[1fr_1fr_3fr] p-2 bg-secondary ">
        <p>Name</p>
        <p>Id</p>
        <p>Skills</p>
      </div>
      <div className="overflow-y-auto h-full">
        {payload.map((region) => (
          <div
            className="grid grid-cols-[1fr_1fr_3fr] p-2 even:bg-secondary/60"
            key={region.id}
          >
            <p>{region.name}</p>
            <p>{region.id}</p>
            <p>
              {region.combatSkills.map((skill) => (
                // Map  skills to button links
                <Button key={skill.id}>{skill.name}</Button>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
