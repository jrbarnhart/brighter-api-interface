import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateRegionSchema } from "../schemas/create-reagion.schema";
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

export default function CreateRegionForm() {
  const form = useForm<z.infer<typeof CreateRegionSchema>>({
    resolver: zodResolver(CreateRegionSchema),
    defaultValues: {
      name: "",
    },
  });

  const queryClient = useQueryClient();

  const token = localStorage.getItem("access_token");

  const authHeaderValue = `Bearer ${token ?? ""}`;

  const mutation = useMutation({
    mutationFn: async (newRegion: components["schemas"]["CreateRegionDto"]) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/regions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeaderValue,
        },
        body: JSON.stringify(newRegion),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      await queryClient.resetQueries({ queryKey: "all-regions" });
    },
  });

  return (
    <>
      <h2 className="text-xl">Create new Region</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {
            mutation.mutate(form.getValues());
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
            {mutation.isPending ? (
              <p>Adding todo...</p>
            ) : (
              <>
                {mutation.isError ? (
                  <p>An error occurred: {mutation.error.message}</p>
                ) : null}

                {mutation.isSuccess ? <p>Region added successfullyS</p> : null}

                <Button type="submit">Create Region</Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </>
  );
}
