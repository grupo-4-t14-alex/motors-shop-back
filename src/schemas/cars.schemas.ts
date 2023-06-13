import { z } from "zod";
import { userSchema } from "./users.schemas";

const createCarSchema = z.object({
  // userId: z.number(),
  brand: z.string().max(50),
  model: z.string().max(120),
  year: z.number(),
  fuel: z.number(),
  km: z.string(),
  color: z.string().max(50),
  fipePrice: z.number(),
  sellPrice: z.number(),
  description: z.string(),
  owner: z.lazy(() => userSchema),
});
const carSchema = createCarSchema.extend({
  id: z.number(),
  isActive: z.boolean().default(true),
});

const updateCarSchema = carSchema.partial();

export { createCarSchema, carSchema, updateCarSchema };
