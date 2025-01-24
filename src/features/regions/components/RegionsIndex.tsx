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
    <div>
      <p>Total: 1</p>
      <p>Total Rooms: 100</p>
      <p>Total Skills 100</p>
    </div>
  );
}
