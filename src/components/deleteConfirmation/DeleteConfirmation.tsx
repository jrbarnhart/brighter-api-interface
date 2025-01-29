import { UseMutationResult } from "@tanstack/react-query";
import { Button } from "../ui/button";

export default function DeleteConfirmation({
  deleteMutation,
  id,
  resourceName,
}: {
  deleteMutation: UseMutationResult<void, Error, string | number>;
  id: string | number;
  resourceName: string;
}) {
  return (
    <div className="space-y-4">
      <h3>Delete this {resourceName}?</h3>
      <p className="text-muted-foreground">
        Note: {resourceName}s with rooms or skills cannot be deleted. Delete all
        of their respective rooms or skills first.
      </p>
      <Button
        variant={"destructive"}
        onClick={() => {
          deleteMutation.mutate(id);
        }}
      >
        Delete {resourceName}
      </Button>
      {deleteMutation.error && (
        <p className="text-destructive">
          An error occurred: {deleteMutation.error.message}
        </p>
      )}
    </div>
  );
}
