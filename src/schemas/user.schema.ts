import { ZodSchema, z } from "zod";
import { CarSchema } from "./cars.schema";

const UserSchema: ZodSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(120),
    email: z.string().max(120),
    cpf: z.string().length(11),
    phone: z.string().length(11),
    birthDate: z.date(),
    description: z.string(),
    isAdmin: z.boolean(),
    password: z.string(),
    cars: z.array(CarSchema),
  });


export{ UserSchema }