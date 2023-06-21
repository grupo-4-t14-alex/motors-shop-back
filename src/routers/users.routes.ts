import { Router } from "express";
import { createUserController, updateUserController, deleteUserController } from "../controllers";
import { ensureDataIsValidMiddleware, ensureEmailIsUniqueMiddleware, validateTokenMiddleware } from "../middlewares";
import { createUserSchema, updateUserSchema } from "../schemas/users.schemas";
import { resetPasswordController, sendEmailResetPasswordController } from "../controllers/user/resetPassword.controller";

const userRoutes : Router = Router()

userRoutes.get("", )
userRoutes.post("", ensureDataIsValidMiddleware(createUserSchema), ensureEmailIsUniqueMiddleware, createUserController)
userRoutes.patch("",validateTokenMiddleware, ensureDataIsValidMiddleware(updateUserSchema), ensureEmailIsUniqueMiddleware, updateUserController)
userRoutes.post("/resetPassword", sendEmailResetPasswordController)
userRoutes.patch("/resetPassword/:token", resetPasswordController)

userRoutes.delete("/:id", validateTokenMiddleware, deleteUserController)
export { userRoutes }