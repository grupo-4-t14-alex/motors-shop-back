import { Router } from "express";
import { createUserController } from "../controllers";
import { ensureDataIsValidMiddleware, ensureEmailIsUniqueMiddleware } from "../middlewares";
import { registerSchema } from "../schemas/users.schemas";

const userRoutes : Router = Router()

userRoutes.get("", )
userRoutes.post("", ensureDataIsValidMiddleware(registerSchema), ensureEmailIsUniqueMiddleware, createUserController)

export { userRoutes }