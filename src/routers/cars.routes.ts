import { Router } from "express";
import {
  createCarController,
  deleteCarController,
  listCarsController,
  updateCarController,
} from "../controllers";

const carRoutes: Router = Router();

carRoutes.post("", createCarController);
carRoutes.patch("/:id", updateCarController);
carRoutes.delete("/:id", deleteCarController);
carRoutes.get("", listCarsController);

export { carRoutes };
