import { Router } from "express";
import { createCarController, deleteCarsControllers } from "../controllers";


const carRoutes : Router = Router()

carRoutes.post("", createCarController)
carRoutes.delete("", deleteCarsControllers)

export default carRoutes