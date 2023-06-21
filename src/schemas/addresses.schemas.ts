import { z } from "zod"

const addressSchema = z.object({
    id: z.number(),
    cep: z.string().max(9),
    estate: z.string().max(50),
    city: z.string().max(50),
    street: z.string().max(50),
    number: z.string().max(7),
    complement: z.string(),
  })

const createAddressSchema = addressSchema.omit({
    id: true
})

export {
    createAddressSchema,
    addressSchema
}