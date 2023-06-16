import { Router } from "express";
import {
  createCarController,
  deleteCarController,
  listCarsController,
  updateCarController,
} from "../controllers";
import { ensureDataIsValidMiddleware, ensureIdExistsMiddleware, ensureUserIsAdvertiserMiddleware, validateTokenMiddleware } from "../middlewares";
import { createCarSchema, updateCarSchema } from "../schemas";
import multer from 'multer'

const carRoutes: Router = Router();

const storage = multer.diskStorage({
  destination: './tmp',
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  }
})
const upload = multer({storage: storage})
const files = upload.fields([{name: 'banner', maxCount: 1}, {name: 'photos', maxCount: 8}])

carRoutes.post("", validateTokenMiddleware, ensureUserIsAdvertiserMiddleware, ensureDataIsValidMiddleware(createCarSchema) ,files, createCarController)
carRoutes.get("", listCarsController)
carRoutes.patch("/:id", validateTokenMiddleware, ensureUserIsAdvertiserMiddleware, ensureIdExistsMiddleware, ensureDataIsValidMiddleware(updateCarSchema), updateCarController)
carRoutes.delete("/:id", validateTokenMiddleware, ensureUserIsAdvertiserMiddleware, ensureIdExistsMiddleware, deleteCarController)

export { carRoutes };
