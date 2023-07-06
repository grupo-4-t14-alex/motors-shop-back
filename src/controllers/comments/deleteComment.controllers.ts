import { Request, Response } from "express";
import { deleteCommentService } from "../../services";

const deleteCommentController = async (request: Request, response: Response): Promise<Response> => {

    const commentId = request.params.idComment

    await deleteCommentService(commentId)

    return response.status(204).send()

}

export {
    deleteCommentController
}