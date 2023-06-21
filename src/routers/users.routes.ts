import { Router } from "express";
import { createUserController, updateUserController } from "../controllers";
import { ensureDataIsValidMiddleware, ensureEmailIsUniqueMiddleware, validateTokenMiddleware } from "../middlewares";
import { registerSchema, updateUserSchema } from "../schemas/users.schemas";
import { resetPasswordController, sendEmailResetPasswordController } from "../controllers/user/resetPassword.controller";

const userRoutes : Router = Router()

userRoutes.get("", )
userRoutes.post("", ensureDataIsValidMiddleware(registerSchema), ensureEmailIsUniqueMiddleware, createUserController)
userRoutes.patch("",validateTokenMiddleware, ensureDataIsValidMiddleware(updateUserSchema), ensureEmailIsUniqueMiddleware, updateUserController)
userRoutes.post("/resetPassword", sendEmailResetPasswordController)
userRoutes.patch("/resetPassword/:token", resetPasswordController)


export { userRoutes }