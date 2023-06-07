import { z } from "zod";

export const carSchema = z.object({
    id: z.number(),
    brand: z.string(),
    model: z.string(),
    year: z.number(),
    fuel: z.string(),
    km: z.string(),
    color: z.string(),
    fipePrice: z.string(),
    sellPrice: z.number(),
    description: z.string(),
    isActive: z.boolean(),
})

export const carArraySchema = carSchema.array()