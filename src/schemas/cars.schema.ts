import { ZodSchema, z } from "zod";
import { UserSchema } from "./user.schema";

const CarSchema: ZodSchema = z.object({
    id: z.number().positive(),
    brand: z.string().max(50),
    model: z.string().max(120),
    year: z.number().int(),
    fuel: z.string().max(50),
    km: z.string().max(7),
    color: z.string().max(50),
    fipePrice: z.union([z.number(), z.string()]),
    sellPrice: z.number(),
    description: z.string(),
    isActive: z.boolean(),
    owner: z.lazy(() => UserSchema),
});




export { CarSchema }