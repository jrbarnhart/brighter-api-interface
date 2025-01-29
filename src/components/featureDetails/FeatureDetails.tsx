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
};

// This will be used in the content function
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export default function FeatureDetails<T extends RequiredRecordProperties>({
  renderContentFn,
  updateForm,
  basePath,
  recordName,
  deleteNotes,
}: {
  renderContentFn: (record: T) => React.ReactNode;
  updateForm: React.ReactNode;
  basePath: string;
  recordName: string;
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
  }>({ id, basePath });

  // Mutation for deleting this record
  const deleteMutation = useDeleteRecord(basePath);

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
          <h2 className="text-2xl truncate">{foundRecord.name}</h2>
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
          updateForm
        ) : isDeleting ? (
          <DeleteConfirmation
            deleteMutation={deleteMutation}
            id={id}
            recordName={recordName}
            notes={deleteNotes ?? ""}
          />
        ) : (
          renderContentFn(foundRecord)
        )}
      </div>
    </ScrollArea>
  );
}
