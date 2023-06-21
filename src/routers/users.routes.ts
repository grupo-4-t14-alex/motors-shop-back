import { Router } from "express";
import { createUserController, deleteUserController } from "../controllers";
import { ensureDataIsValidMiddleware, ensureEmailIsUniqueMiddleware, validateTokenMiddleware } from "../middlewares";
import { registerSchema } from "../schemas/users.schemas";
import { resetPasswordController, sendEmailResetPasswordController } from "../controllers/user/resetPassword.controller";

const userRoutes : Router = Router()

userRoutes.get("", )
userRoutes.post("", ensureDataIsValidMiddleware(registerSchema), ensureEmailIsUniqueMiddleware, createUserController)
userRoutes.post("/resetPassword", sendEmailResetPasswordController)
userRoutes.patch("/resetPassword/:token", resetPasswordController)

userRoutes.delete("/:id", validateTokenMiddleware, deleteUserController)
export { userRoutes }