import { z } from "zod";

const createCommentSchema = z.object({
    comment: z.string().nonempty()

})

const commentSchemaReturn = createCommentSchema.extend({
    id: z.string()
})

export {
    createCommentSchema,
    commentSchemaReturn
}