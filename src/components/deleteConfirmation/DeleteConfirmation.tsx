import { UseMutationResult } from "@tanstack/react-query";
import { Button } from "../ui/button";

export default function DeleteConfirmation({
  deleteMutation,
  id,
  recordLabel,
  notes,
}: {
  deleteMutation: UseMutationResult<void, Error, string | number>;
  id: string | number;
  recordLabel: string;
  notes: string;
}) {
  return (
    <div className="space-y-4">
      <h3>Delete this {recordLabel}?</h3>
      <p className="text-muted-foreground">{notes}</p>
      <Button
        variant={"destructive"}
        onClick={() => {
          deleteMutation.mutate(id);
        }}
      >
        Delete {recordLabel}
      </Button>
      {deleteMutation.error && (
        <p className="text-destructive">
          An error occurred: {deleteMutation.error.message}
        </p>
      )}
    </div>
  );
}
