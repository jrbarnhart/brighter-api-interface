import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { useEffect } from "react";

export default function FeatureForm<T extends FieldValues>({
  children,
  form,
  method,
  url,
  queryKey,
  recordLabel,
}: {
  children: React.ReactNode;
  form: UseFormReturn<T>;
  method: "POST" | "PATCH";
  url: string;
  queryKey: string;
  recordLabel: string;
}) {
  const navigate = useNavigate();

  const { id } = useParams();

  const queryClient = useQueryClient();

  const token = localStorage.getItem("access_token");

  const authHeaderValue = `Bearer ${token ?? ""}`;

  const { formState, reset } = form;

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState.isSubmitSuccessful, reset]);

  const mutation = useMutation({
    mutationFn: async (bodyData: T) => {
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
          {children}
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
