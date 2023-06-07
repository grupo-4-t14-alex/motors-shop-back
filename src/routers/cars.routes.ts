import { Router } from "express";
import { createCarController, deleteCarsControllers } from "../controllers";
import { updateCarController } from "../controllers/cars/updateCar.controllers";


const carRoutes : Router = Router()

carRoutes.post("", createCarController)
carRoutes.patch("/:CarId", updateCarController)
carRoutes.delete("", deleteCarsControllers)

export default carRoutes