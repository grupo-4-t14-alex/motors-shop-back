import { Router } from "express";
<<<<<<< HEAD
import { createCarController, deleteCarsControllers } from "../controllers";
import { updateCarController } from "../controllers/cars/updateCar.controllers";
=======
import { createCarController, deleteCarsControllers, listCarsController } from "../controllers";
>>>>>>> 5516215b60089bea0ef88337412335a03025ec86


const carRoutes : Router = Router()

carRoutes.post("", createCarController)
carRoutes.patch("/:CarId", updateCarController)
carRoutes.delete("", deleteCarsControllers)
carRoutes.get("", listCarsController)

export default carRoutes