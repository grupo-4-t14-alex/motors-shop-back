import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().email()
})

export type LoginRequest = z.infer<typeof loginSchema>