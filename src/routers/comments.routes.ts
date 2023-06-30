import { Router } from "express";
import { createCommentController, listCommentsController  } from "../controllers";
import { ensureDataIsValidMiddleware, validateTokenMiddleware } from "../middlewares";
import { createCommentSchema } from "../schemas";

const commentRoutes: Router = Router()

commentRoutes.post("/:userId/:carId", validateTokenMiddleware, ensureDataIsValidMiddleware(createCommentSchema), createCommentController)

commentRoutes.get("", listCommentsController)


export { commentRoutes }