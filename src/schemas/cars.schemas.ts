import { z, union } from "zod";

const createCarSchema = z.object({
    userId: z.number(),
    brand: z.string().max(50),
    model: z.string().max(120),
    year: z.number(),
    fuel: z.number(),
    km: z.number(),
    color: z.string().max(50),
    fipePrice: z.number(),
    sellPrice: z.number(),
    description: z.string(),
    isActive: z.boolean().default(true),
})

const carSchema = createCarSchema.extend({
    id: z.number()
})

export {
    createCarSchema,
    carSchema
}