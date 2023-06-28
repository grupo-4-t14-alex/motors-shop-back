import { Router } from "express";
import { createUserController, updateUserController, deleteUserController } from "../controllers";
import { ensureDataIsValidMiddleware, ensureEmailIsUniqueMiddleware, validateTokenMiddleware } from "../middlewares";
import { createUserSchema, updateUserSchema } from "../schemas/users.schemas";
import { resetPasswordController, sendEmailResetPasswordController } from "../controllers/user/resetPassword.controller";
import { retrieveUserController } from "../controllers/user/retrieveUser.controller";

const userRoutes : Router = Router()

userRoutes.get("/:userId", retrieveUserController)
userRoutes.post("", ensureDataIsValidMiddleware(createUserSchema), ensureEmailIsUniqueMiddleware, createUserController)
userRoutes.patch("",validateTokenMiddleware, ensureDataIsValidMiddleware(updateUserSchema), updateUserController)
userRoutes.post("/resetPassword", sendEmailResetPasswordController)
userRoutes.patch("/resetPassword/:token", resetPasswordController)

userRoutes.delete("/:id", validateTokenMiddleware, deleteUserController)
export { userRoutes }