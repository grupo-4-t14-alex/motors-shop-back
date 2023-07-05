import { z } from "zod";
import { commentSchemaReturn, createCommentSchema } from "../schemas";
import { updateCommentSchema } from "../schemas/comments.schema";

type iComment = z.infer<typeof createCommentSchema>
type iCommentReturn = z.infer<typeof commentSchemaReturn>
type iCommentUpdate = z.infer<typeof updateCommentSchema>

export {
    iComment,
    iCommentReturn,
    iCommentUpdate
}