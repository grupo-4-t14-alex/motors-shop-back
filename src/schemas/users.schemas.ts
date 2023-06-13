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


export{ userSchema }