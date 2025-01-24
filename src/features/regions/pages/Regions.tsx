import { components } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router";

export default function Regions() {
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
    <div className="flex flex-col">
      <div className="flex gap-2">
        <h1>Regions:</h1>
        <p>{`Count: ${payload.length.toString() || "Not found"}`}</p>
        <p>
          Total Rooms:{" "}
          {payload.reduce(
            (roomCount, currentRegion) =>
              roomCount + currentRegion.rooms.length,
            0
          )}
        </p>
      </div>
      <div className="overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
