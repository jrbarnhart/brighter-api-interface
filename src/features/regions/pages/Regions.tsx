import FeatureHeader from "@/components/featureHeader/FeatureHeader";
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
    <>
      <FeatureHeader label="Regions" urlName="regions" />
      <div className="pt-5">
        <Outlet />
      </div>
    </>
  );
}
