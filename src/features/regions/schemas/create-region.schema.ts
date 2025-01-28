import { paths } from "@/types/api";
import { ZodSchemaFromType } from "@/types/zod";
import { z } from "zod";

export const CreateRegionSchema = z.object({
  name: z.string().trim().nonempty(),
} satisfies ZodSchemaFromType<paths["/regions"]["post"]["requestBody"]["content"]["application/json"]>);
