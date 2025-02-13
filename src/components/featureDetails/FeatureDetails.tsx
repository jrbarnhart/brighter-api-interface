import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { useParams } from "react-router";
import useGetRecordById from "@/queries/useGetRecordById";
import useDeleteRecord from "@/queries/useDeleteRecord";
import DeleteConfirmation from "../deleteConfirmation/DeleteConfirmation";

type RequiredRecordProperties = {
  id: number;
  name?: string;
  unlockLevel?: number | string;
};

export default function FeatureDetails<T extends RequiredRecordProperties>({
  RenderContent,
  UpdateForm,
  redirectPath,
  url,
  getByIdQueryKey,
  deleteQueryKey,
  recordLabel,
  deleteNotes,
}: {
  RenderContent: React.ComponentType<{ record: T }>;
  UpdateForm: React.ComponentType<{ record: T }>;
  redirectPath: string;
  url: string;
  getByIdQueryKey: string;
  deleteQueryKey: string;
  recordLabel: string;
  deleteNotes?: string;
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Qeury to get the record data
  let { id } = useParams();
  // Could return early here instead of letting the error propagate
  if (!id) id = "";
  // Must wrap with {data: } to match json. Probably a better way but eh this works.
  const { isLoading, isSuccess, error, data } = useGetRecordById<{
    data: T;
  }>({ id, url, queryKey: getByIdQueryKey });

  // Mutation for deleting this record
  const deleteMutation = useDeleteRecord({
    redirectPath,
    url,
    queryKey: deleteQueryKey,
  });

  // Return skeletons and error elements
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!isSuccess) {
    return (
      <div>
        <p>There was a problem fetching the data.</p>
      </div>
    );
  }

  const { data: foundRecord } = data;

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4">
        <div className="flex h-8 items-start gap-3">
          <h2 className="text-2xl truncate">
            {foundRecord.unlockLevel
              ? `Lvl: ${foundRecord.unlockLevel.toString()}`
              : foundRecord.name}
          </h2>
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
          <UpdateForm record={foundRecord} />
        ) : isDeleting ? (
          <DeleteConfirmation
            deleteMutation={deleteMutation}
            id={id}
            recordLabel={recordLabel}
            notes={deleteNotes ?? ""}
          />
        ) : (
          <RenderContent record={foundRecord} />
        )}
      </div>
    </ScrollArea>
  );
}
