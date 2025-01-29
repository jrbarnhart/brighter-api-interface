import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useParams } from "react-router";
import UpdateRegionForm from "./UpdateRegionForm";
import ScrollList from "@/components/scrollList/ScrollList";
import DeleteConfirmation from "@/components/deleteConfirmation/DeleteConfirmation";
import useGetRecordById from "../queries/useGetRecordById";
import useDeleteRecord from "../queries/useDeleteRecord";
import { paths } from "@/types/api";

export default function Region() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Qeury to get the region data
  let { id } = useParams();
  if (!id) id = "";
  const { isLoading, isSuccess, error, data } = useGetRecordById<{
    data: paths["/regions/{id}"]["get"]["responses"]["200"]["content"]["application/json"];
  }>({ id, basePath: "/regions" });

  // Mutation for deleting this region
  const deleteRegionMutation = useDeleteRecord("/regions");

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
            notes="Note: Regions with rooms or skills cannot be deleted. Delete all
        of their respective rooms or skills first."
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
