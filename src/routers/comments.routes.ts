import { Router } from "express";
import { createCommentController } from "../controllers/comments/createComment.controlrers";
import { listCommentsController } from "../controllers/comments/listComments.controllers";
import { ensureDataIsValidMiddleware, validateTokenMiddleware } from "../middlewares";
import { createCommentSchema } from "../schemas";

const commentRoutes: Router = Router()

commentRoutes.post("/:userId/:carId", validateTokenMiddleware, ensureDataIsValidMiddleware(createCommentSchema), createCommentController)

commentRoutes.get("", listCommentsController)


export { commentRoutes }