import { Router } from "express";
import { createUserController, updateUserController } from "../controllers";
import { ensureDataIsValidMiddleware, ensureEmailIsUniqueMiddleware, validateTokenMiddleware } from "../middlewares";
import { registerSchema, updateUserSchema } from "../schemas/users.schemas";


const userRoutes : Router = Router()

userRoutes.get("", )
userRoutes.post("", ensureDataIsValidMiddleware(registerSchema), ensureEmailIsUniqueMiddleware, createUserController)
userRoutes.patch("",validateTokenMiddleware, ensureDataIsValidMiddleware(updateUserSchema), ensureEmailIsUniqueMiddleware, updateUserController)

export { userRoutes }