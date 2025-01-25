import { ScrollArea } from "@/components/ui/scroll-area";
import { paths } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function Region() {
  const { id } = useParams();

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const { isLoading, isSuccess, error, data } = useQuery({
    queryKey: ["region-by-id"],
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

  const { data: region } = data;

  return (
    <>
      <h2 className="text-2xl">{region.name}</h2>
      <h3 className="text-xl">Rooms:</h3>
      <ScrollArea className="w-96 h-44 bg-secondary border-2 rounded-xl pl-3">
        {region.rooms.map((room) => (
          <p className="pb-1" key={room.id}>
            {room.name}
          </p>
        ))}
      </ScrollArea>
    </>
  );
}
