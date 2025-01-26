import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { components, paths } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../schemas/login.schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { loginResponseSchema } from "../schemas/login.response.schema";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const { setToken } = useContext(AuthContext);

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
    ): Promise<{
      data: paths["/auth/login"]["post"]["responses"]["200"]["content"]["application/json"];
    }> => {
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

      const responseJson: unknown = await response.json();

      const validatedResponse = loginResponseSchema.safeParse(responseJson);

      if (!validatedResponse.success) {
        throw new Error("Error validating response");
      }

      return validatedResponse.data;
    },
    onSuccess: async (data) => {
      setToken(data.data.access_token);
      await navigate("/");
    },
  });

  return (
    <div className="p-4 space-y-5">
      <h2 className="text-3xl">Login</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {
            mutation.mutate(form.getValues());
          })}
          className="space-y-4"
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
    </div>
  );
}
