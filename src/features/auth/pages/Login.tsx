import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { components } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../schemas/login.schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";

export default function Login() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (
      loginCredentials: components["schemas"]["SignInDto"]
    ) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginCredentials),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    },
  });

  return (
    <>
      <h2 className="text-xl">Login</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {
            mutation.mutate(form.getValues());
          })}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
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
                  <p className="text-destructive">
                    Login failed: {mutation.error.message}
                  </p>
                ) : null}
                <Button type="submit">Login</Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </>
  );
}
