import { paths } from "@/types/api";
import { ZodSchemaFromType } from "@/types/zod";
import { z } from "zod";

export const UpdateRegionSchema = z.object({
  name: z.string().trim().nonempty(),
} satisfies ZodSchemaFromType<paths["/regions/{id}"]["patch"]["requestBody"]["content"]["application/json"]>);
