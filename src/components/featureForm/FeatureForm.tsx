import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { z, ZodSchema } from "zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";

export default function FeatureForm<TSchema extends ZodSchema>({
  form,
  method,
  url,
  queryKey,
  recordLabel,
  renderContentsFn,
}: {
  form: UseFormReturn<z.infer<TSchema>>;
  method: "POST" | "PATCH";
  url: string;
  queryKey: string;
  recordLabel: string;
  renderContentsFn: ({
    form,
  }: {
    form: UseFormReturn<z.infer<TSchema>>;
  }) => React.ReactNode;
}) {
  const navigate = useNavigate();

  const { id } = useParams();

  const queryClient = useQueryClient();

  const token = localStorage.getItem("access_token");

  const authHeaderValue = `Bearer ${token ?? ""}`;

  const mutation = useMutation({
    mutationFn: async (bodyData: TSchema) => {
      const response = await fetch(`${url}${id ? `/${id}` : ""}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeaderValue,
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      await queryClient.resetQueries({ queryKey });

      if (method === "PATCH") {
        await navigate(0);
      }
    },
  });

  return (
    <>
      <h2 className="text-xl">
        {method === "POST" ? "Create new" : "Update"} {recordLabel}
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {
            mutation.mutate(form.getValues());
          })}
          className="space-y-8"
        >
          {renderContentsFn({ form })}
          <div>
            {mutation.isPending ? (
              <p>
                {method === "POST" ? "Adding" : "Updating"} {recordLabel}...
              </p>
            ) : (
              <>
                {mutation.isError ? (
                  <p className="text-destructive">
                    An error occurred: {mutation.error.message}
                  </p>
                ) : null}

                {mutation.isSuccess ? (
                  <p>
                    {recordLabel}{" "}
                    {method === "POST"
                      ? "added successfully."
                      : "updated successfully."}
                  </p>
                ) : null}

                <Button type="submit">
                  {method === "POST" ? "Create" : "Update"} {recordLabel}
                </Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </>
  );
}
