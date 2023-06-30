import { Request, Response } from "express";
import { createCommentService } from "../../services";


const createCommentController = async (request: Request, response: Response): Promise<Response> => {
    
    const commentData = request.body
    const userId = Number(request.user.id)
    const carId = Number(request.params.carId)

    const newComment = await createCommentService(commentData, userId, carId)

    const bodyReturn = {
        id: newComment.id,
        comment: commentData.comment,
        createdAt: commentData.created
    }

    return response.status(201).json(bodyReturn)

}

export { createCommentController }