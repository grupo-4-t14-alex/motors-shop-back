import { Router } from "express";
import { createUsersController } from "../controllers/users.controllers";
const userRoutes : Router = Router()
userRoutes.get('',createUsersController)

export default userRoutes