import { Router } from "express";
import {
  createCarController,
  deleteCarsControllers,
  listCarsController,
  updateCarController,
} from "../controllers";

const carRoutes: Router = Router();

carRoutes.post("", createCarController);
carRoutes.patch("/:id", updateCarController);
carRoutes.delete("", deleteCarsControllers);
carRoutes.get("", listCarsController);

export { carRoutes };
