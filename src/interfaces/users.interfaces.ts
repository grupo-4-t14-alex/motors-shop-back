import { z } from "zod";
import { createUserSchema, userSchema, updateUserSchema, userSchemaReturn } from "../schemas"

type IUser = z.infer<typeof userSchema>
type IUserReturn = z.infer<typeof userSchemaReturn>
type IUserCreateRequest = z.infer<typeof createUserSchema>
type IUserUpdateRequest = z.infer<typeof updateUserSchema>

export { 
    IUser, IUserCreateRequest, IUserUpdateRequest, IUserReturn
}
