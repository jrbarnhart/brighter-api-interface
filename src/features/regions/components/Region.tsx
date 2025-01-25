import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { paths } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";

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
    <ScrollArea className="h-full">
      <div className="space-y-4">
        <h2 className="text-2xl">{region.name}</h2>
        <div className="flex gap-3 h-screen">
          <p className="text-xl">Rooms:</p>
          <ScrollArea className="w-96 h-44 bg-secondary border-2 rounded-xl pl-3">
            <div className="flex flex-col items-start">
              {region.rooms.map((room) => (
                <Button
                  key={room.id}
                  variant={"link"}
                  className="text-base p-0 underline"
                  asChild
                >
                  <Link to={`/rooms/${room.id.toString()}`}>{room.name}</Link>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </ScrollArea>
  );
}
