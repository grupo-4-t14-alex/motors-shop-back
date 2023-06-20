import { z } from "zod";
import { registerSchema, updateUserSchema, userSchemaBody, userSchemaRequest } from "../schemas/users.schemas"

type iUser = z.infer<typeof userSchemaBody>
type iUserRequest = z.infer<typeof userSchemaRequest>
type iUserRegister = z.infer<typeof registerSchema>
type IUserUpdate = z.infer<typeof updateUserSchema>

export { iUser, iUserRequest, iUserRegister, IUserUpdate }