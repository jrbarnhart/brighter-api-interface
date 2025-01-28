import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { paths } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import UpdateRegionForm from "./UpdateRegionForm";

export default function Region() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Qeury to get the region data
  let { id } = useParams();
  if (!id) id = "";

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const { isLoading, isSuccess, error, data } = useQuery({
    queryKey: ["region-by-id"],
    queryFn: (): Promise<{
      data: paths["/regions/{id}"]["get"]["responses"]["200"]["content"]["application/json"];
    }> =>
      fetch(`${import.meta.env.VITE_API_URL}/regions/${id}`, {
        headers: new Headers(),
      }).then((res) => res.json()),
  });

  // Mutation for deleting this region
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  const authHeaderValue = `Bearer ${token ?? ""}`;

  const deleteRegionMutation = useMutation({
    mutationFn: async (regionToDeleteId: string) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/regions/${regionToDeleteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authHeaderValue,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      await queryClient.resetQueries({ queryKey: "all-regions" });

      await navigate("/regions");
    },
  });

  // Return skeletons and error elements
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

  // Mutation for deleting this region

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4">
        <div className="flex h-8 items-start gap-3">
          <h2 className="text-2xl">{region.name}</h2>
          <div className="w-1 h-full bg-secondary rounded-xl border-border" />
          <Button
            variant={"link"}
            onClick={() => {
              setIsDeleting(false);
              setIsUpdating((prev) => !prev);
            }}
            className="text-yellow-500 text-lg p-0"
          >
            {isUpdating ? "Cancel" : "Update"}
          </Button>
          <Button
            variant={"link"}
            onClick={() => {
              setIsUpdating(false);
              setIsDeleting((prev) => !prev);
            }}
            className="text-destructive text-lg p-0"
          >
            {isDeleting ? "Cancel" : "Delete"}
          </Button>
        </div>
        {isUpdating ? (
          <UpdateRegionForm />
        ) : isDeleting ? (
          <div className="space-y-4">
            <h3>Delete this region?</h3>
            <p className="text-muted-foreground">
              Note: Regions with rooms or skills cannot be deleted. Delete all
              of their respective rooms or skills first.
            </p>
            <Button
              variant={"destructive"}
              onClick={() => {
                deleteRegionMutation.mutate(id);
              }}
            >
              Delete Region
            </Button>
            {deleteRegionMutation.error && (
              <p className="text-destructive">
                An error occurred: {deleteRegionMutation.error.message}
              </p>
            )}
          </div>
        ) : (
          <>
            {" "}
            <p className="text-xl">Id: {region.id}</p>
            <div className="flex flex-col gap-2">
              <p className="text-xl">Rooms:</p>
              <ScrollArea className="w-fit max-w-96 min-w-44 h-44 bg-secondary shadow-inner shadow-accent rounded-xl px-3">
                <div className="flex flex-col items-start">
                  {region.rooms.map((room) => (
                    <Button
                      key={room.id}
                      variant={"link"}
                      className="text-base p-0 underline truncate"
                      asChild
                    >
                      <Link to={`/rooms/${room.id.toString()}`}>
                        {room.name}
                      </Link>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl">Combat Skills:</p>
              <ScrollArea className="w-fit max-w-96 min-w-44 h-44 bg-secondary shadow-inner shadow-accent rounded-xl px-3">
                <div className="flex flex-col items-start">
                  {region.combatSkills.map((skill) => (
                    <Button
                      key={skill.id}
                      variant={"link"}
                      className="text-base p-0 underline truncate"
                      asChild
                    >
                      <Link to={`/skills/combat/${skill.id.toString()}`}>
                        {skill.name}
                      </Link>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl">Gathering Skills:</p>
              <ScrollArea className="w-fit max-w-96 min-w-44 h-44 bg-secondary shadow-inner shadow-accent rounded-xl px-3">
                <div className="flex flex-col items-start">
                  {region.gatheringSkills.map((skill) => (
                    <Button
                      key={skill.id}
                      variant={"link"}
                      className="text-base p-0 underline truncate"
                      asChild
                    >
                      <Link to={`/skills/gathering/${skill.id.toString()}`}>
                        {skill.name}
                      </Link>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl">Crafting Skills:</p>
              <ScrollArea className="w-fit max-w-96 min-w-44 h-44 bg-secondary shadow-inner shadow-accent rounded-xl px-3">
                <div className="flex flex-col items-start">
                  {region.craftingSkills.map((skill) => (
                    <Button
                      key={skill.id}
                      variant={"link"}
                      className="text-base p-0 underline truncate"
                      asChild
                    >
                      <Link to={`/skills/crafting/${skill.id.toString()}`}>
                        {skill.name}
                      </Link>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>{" "}
          </>
        )}
      </div>
    </ScrollArea>
  );
}
