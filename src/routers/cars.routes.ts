import { Router } from "express";
import { createCarController, deleteCarsControllers, listCarsController } from "../controllers";


const carRoutes : Router = Router()

carRoutes.post("", createCarController)
carRoutes.delete("", deleteCarsControllers)
carRoutes.get("", listCarsController)

export default carRoutes