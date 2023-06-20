import { ZodSchema, z } from "zod";
import { carSchema } from "./cars.schemas";

const userSchema: ZodSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(120),
  email: z.string().max(120),
  cpf: z.string().length(11),
  phone: z.string().length(11),
  birthDate: z.date(),
  description: z.string(),
  admin: z.boolean(),
  password: z.string(),
  cars: z.array(carSchema),
});

const userSchemaBody = z.object({
  name: z.string().max(120),
  email: z.string().max(120),
  cpf: z.string().length(11),
  phone: z.string().length(11),
  birthDate: z.string(),
  description: z.string(),
  admin: z.boolean().default(false),
  password: z.string(),
  cars: z.array(carSchema).optional()
})

const adressSchema = z.object({
  cep: z.string().max(9),
  estate: z.string().max(50),
  city: z.string().max(50),
  street: z.string().max(50),
  number: z.string().max(7),
  complement: z.string(),
})

const updateAdressSchema = adressSchema.partial()

const registerSchema = userSchemaBody.extend({
  address: adressSchema
})

const updateSchema = userSchemaBody.extend({
  address: updateAdressSchema
})


const updateUserSchema = updateSchema.omit({
  cars: true
}).partial()


const userSchemaRequest = userSchemaBody.omit({
  password: true
})


export{ userSchema, userSchemaBody, userSchemaRequest, registerSchema, updateUserSchema ,updateAdressSchema }