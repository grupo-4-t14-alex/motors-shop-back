import { Router } from "express";
import { createUserController,
    deleteUserController,
    resetPasswordController,
    retrieveUserController,
    updateUserController,
    sendEmailResetPasswordController } from "../controllers";
import { 
    ensureDataIsValidMiddleware, 
    ensureEmailIsUniqueMiddleware, 
    validateTokenMiddleware } from "../middlewares";
import { createUserSchema, updateUserSchema } from "../schemas";

const userRoutes : Router = Router()

userRoutes.get("/:userId", retrieveUserController)
userRoutes.post("", ensureDataIsValidMiddleware(createUserSchema), ensureEmailIsUniqueMiddleware, createUserController)
userRoutes.patch("",validateTokenMiddleware, ensureDataIsValidMiddleware(updateUserSchema), updateUserController)
userRoutes.post("/resetPassword", sendEmailResetPasswordController)
userRoutes.patch("/resetPassword/:token", resetPasswordController)

userRoutes.delete("/:id", validateTokenMiddleware, deleteUserController)
export { userRoutes }