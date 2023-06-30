import { z } from "zod";
import { commentSchemaReturn, createCommentSchema } from "../schemas";

type iComment = z.infer<typeof createCommentSchema>
type iCommentReturn = z.infer<typeof commentSchemaReturn>

export {
    iComment,
    iCommentReturn
}