import { z } from "zod";
import { registerSchema, userSchemaBody, userSchemaRequest } from "../schemas/users.schemas"

type iUser = z.infer<typeof userSchemaBody>
type iUserRequest = z.infer<typeof userSchemaRequest>
type iUserRegister = z.infer<typeof registerSchema>

export { iUser, iUserRequest, iUserRegister }