import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { paths } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import UpdateRegionForm from "./UpdateRegionForm";
import ScrollList from "@/components/scrollList/ScrollList";
import DeleteConfirmation from "@/components/deleteConfirmation/DeleteConfirmation";

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
    mutationFn: async (regionToDeleteId: string | number) => {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/regions/${regionToDeleteId.toString()}`,
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
          <DeleteConfirmation
            deleteMutation={deleteRegionMutation}
            id={id}
            resourceName="Region"
          />
        ) : (
          <>
            <p className="text-xl">Id: {region.id}</p>
            <ScrollList basePath="rooms" title="Rooms" items={region.rooms} />
            <ScrollList
              basePath="skills/combat"
              title="Combat Skills"
              items={region.combatSkills}
            />
            <ScrollList
              basePath="skills/gathering"
              title="Gathering Skills"
              items={region.gatheringSkills}
            />
            <ScrollList
              basePath="skills/crafting"
              title="Crafting Skills"
              items={region.craftingSkills}
            />
          </>
        )}
      </div>
    </ScrollArea>
  );
}
