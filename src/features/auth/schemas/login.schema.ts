import { paths } from "@/types/api";
import { ZodSchemaFromType } from "@/types/zod";
import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().trim().nonempty(),
  password: z.string().trim().nonempty(),
} satisfies ZodSchemaFromType<paths["/auth/login"]["post"]["requestBody"]["content"]["application/json"]>);
