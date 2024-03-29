import { Router } from "express";
import { createCommentController, deleteCommentController, listCommentsController, updateCommentController  } from "../controllers";
import { ensureDataIsValidMiddleware, validateTokenMiddleware } from "../middlewares";
import { createCommentSchema } from "../schemas";

const commentRoutes: Router = Router()

commentRoutes.post("/:carId", validateTokenMiddleware, ensureDataIsValidMiddleware(createCommentSchema), createCommentController)

commentRoutes.get("", listCommentsController)

commentRoutes.patch("/:idComment", validateTokenMiddleware, updateCommentController)

commentRoutes.delete("/:idComment", validateTokenMiddleware, deleteCommentController)


export { commentRoutes }