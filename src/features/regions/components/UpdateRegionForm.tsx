import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { components } from "@/types/api";
import { UpdateRegionSchema } from "../schemas/update-region.schema";
import { useNavigate, useParams } from "react-router";

export default function UpdateRegionForm() {
  const form = useForm<z.infer<typeof UpdateRegionSchema>>({
    resolver: zodResolver(UpdateRegionSchema),
    defaultValues: {
      name: "",
    },
  });

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { id } = useParams();

  const token = localStorage.getItem("access_token");

  const authHeaderValue = `Bearer ${token ?? ""}`;

  const updateRegionMutation = useMutation({
    mutationFn: async (
      updatedRegion: components["schemas"]["UpdateRegionDto"]
    ) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/regions/${id ?? ""}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeaderValue,
          },
          body: JSON.stringify(updatedRegion),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      await queryClient.resetQueries({ queryKey: "all-regions" });

      await navigate(0);
    },
  });

  return (
    <>
      <h2 className="text-xl">Update Region</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {
            updateRegionMutation.mutate(form.getValues());
          })}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Region Name" {...field} />
                </FormControl>
                <FormDescription>The name of the region.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            {updateRegionMutation.isPending ? (
              <p>Updating region...</p>
            ) : (
              <>
                {updateRegionMutation.isError ? (
                  <p className="text-destructive">
                    An error occurred: {updateRegionMutation.error.message}
                  </p>
                ) : null}

                {updateRegionMutation.isSuccess ? (
                  <p>Region updated successfully.</p>
                ) : null}

                <Button type="submit">Submit Changes</Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </>
  );
}
