import { Router } from "express";
import { listCarsController } from "../controllers/cars/listCars.controllers";

export const carRoutes: Router = Router()

carRoutes.get("", listCarsController)