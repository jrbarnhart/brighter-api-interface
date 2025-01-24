import { Button } from "@/components/ui/button";
import { components } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { Link, Outlet } from "react-router";

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
    <>
      <div className="flex flex-col h-8">
        <div className="flex gap-2 items-start h-full">
          <h1 className="text-2xl">Regions</h1>
          <div className="w-1 h-full bg-secondary rounded-xl border-border" />
          <Button variant={"link"} className="pl-1 text-accent" asChild>
            <Link to={"/regions/create"}>Create</Link>
          </Button>
        </div>
      </div>
      <div className="pt-5">
        <Outlet />
      </div>
    </>
  );
}
