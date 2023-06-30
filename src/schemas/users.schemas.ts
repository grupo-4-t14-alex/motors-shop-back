import { z } from "zod";
import { carSchema } from "./cars.schemas";
import { createAddressSchema } from "./addresses.schemas";

const createUserSchema = z.object({
  name: z.string().max(120),
  email: z.string().max(120),
  cpf: z.string().length(11),
  phone: z.string().length(11),
  birthDate: z.string(),
  description: z.string(),
  admin: z.boolean().default(false),
  password: z.string(),
  address: createAddressSchema,
});

const userSchema = createUserSchema
  .extend({
    id: z.number().positive(),
    cars: z.array(carSchema),
  })
  .omit({
    password: true,
  });

const userSchemaReturn = userSchema.omit({
  cars: true,
});

const updateUserSchema = createUserSchema
  .partial({
    name: true,
    email: true,
    cpf: true,
    phone: true,
    birthDate: true,
    description: true,
    address: true,
    admin: true,
  })
  .omit({ password: true });


export { createUserSchema, userSchema, updateUserSchema, userSchemaReturn };
