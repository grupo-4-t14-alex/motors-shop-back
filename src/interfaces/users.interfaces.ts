import { z } from "zod";
import { createUserSchema, userSchema, updateUserSchema } from "../schemas/users.schemas"

type IUser = z.infer<typeof userSchema>
type IUserCreateRequest = z.infer<typeof createUserSchema>
type IUserUpdateRequest = z.infer<typeof updateUserSchema>

export { 
    IUser, IUserCreateRequest, IUserUpdateRequest
}