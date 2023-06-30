import { z } from "zod";

const createCarSchema = z.object({
  brand: z.string().max(50),
  model: z.string().max(120),
  year: z.number(),
  fuel: z.number(),
  km: z.number(),
  color: z.string().max(50),
  fipePrice: z.number(),
  sellPrice: z.number(),
  description: z.string(),
});

const carSchema = createCarSchema.extend({
  id: z.number(),
  isActive: z.boolean().default(true),
});

const carImageSchema = z.object({
  banner: z.array(z.custom<File>()),
  photos: z.array(z.custom<File>()),
});

const updateCarSchema = carSchema
  .partial({
    brand: true,
    model: true,
    year: true,
    fuel: true,
    km: true,
    color: true,
    fipePrice: true,
    sellPrice: true,
    description: true,
    isActive: true,
  })
  .omit({
    id: true,
  });

export { createCarSchema, carSchema, carImageSchema, updateCarSchema };
