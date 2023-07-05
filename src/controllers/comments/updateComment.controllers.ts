import { Request, Response } from "express";
import { updateCommentService } from "../../services";

const updateCommentController = async (request: Request, response: Response): Promise<Response> => {

    const commentId = request.params.idComment
    const commentData = request.body
    const userId = request.user.id

    const updateComment = await updateCommentService(commentData, commentId, userId)

    return response.status(200).json(updateComment)

}

export {
    updateCommentController
}