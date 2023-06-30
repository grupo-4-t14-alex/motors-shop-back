import { z } from "zod";
import { userSchema } from "./users.schemas";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().email()
})

export const loginReturnSchema = userSchema.extend({
    id: z.number().positive()
}).omit({
    password: true,
    address: true,
    cars: true
})

