import { z } from "zod";

const createCommentSchema = z.object({
    comment: z.string().nonempty()
})

const commentSchemaReturn = createCommentSchema.extend({
    id: z.string(),
    createdAt: z.string()
})

const updateCommentSchema = createCommentSchema.partial({
    comment: true
})

export {
    createCommentSchema,
    commentSchemaReturn,
    updateCommentSchema
}