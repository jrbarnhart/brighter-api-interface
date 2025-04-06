import { z } from "zod";

export const loginResponseSchema = z.object({ access_token: z.string() });
