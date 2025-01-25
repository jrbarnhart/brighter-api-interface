import { paths } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function Region() {
  const { id } = useParams();

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const { isLoading, isSuccess, error, data } = useQuery({
    queryKey: ["allRegions"],
    queryFn: (): Promise<{
      data: paths["/regions/{id}"]["get"]["responses"]["200"]["content"]["application/json"];
    }> =>
      fetch(`${import.meta.env.VITE_API_URL}/regions/${id ?? "0"}`, {
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
      <p>{payload.name}</p>
    </>
  );
}
