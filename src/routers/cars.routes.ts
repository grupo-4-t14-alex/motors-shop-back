import { Router } from "express";
import {
  createCarController,
  deleteCarController,
  listCarsController,
  updateCarController,
} from "../controllers";
import {
  ensureDataIsValidMiddleware,
  ensureIdExistsMiddleware,
  ensureUserIsAdvertiserMiddleware,
  validateTokenMiddleware,
} from "../middlewares";
import { createCarSchema, updateCarSchema } from "../schemas";
import { retriveCarsController } from "../controllers/cars/retriveCars.controller";
import { listCommentsByIdController } from "../controllers/comments/listCommentsById.controllers";

const carRoutes: Router = Router();

carRoutes.post(
  "",
  validateTokenMiddleware,
  ensureUserIsAdvertiserMiddleware,
  ensureDataIsValidMiddleware(createCarSchema),
  createCarController
);
carRoutes.get("", listCarsController);
carRoutes.patch(
  "/:id",
  validateTokenMiddleware,
  ensureUserIsAdvertiserMiddleware,
  ensureIdExistsMiddleware,
  ensureDataIsValidMiddleware(updateCarSchema),
  updateCarController
);
carRoutes.delete(
  "/:id",
  validateTokenMiddleware,
  ensureUserIsAdvertiserMiddleware,
  ensureIdExistsMiddleware,
  deleteCarController
);
carRoutes.get("/:id", validateTokenMiddleware, retriveCarsController);

carRoutes.get("/:carId/comments", listCommentsByIdController);

export { carRoutes };
