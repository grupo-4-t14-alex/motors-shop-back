import { Request, Response } from "express";
import { listCommentsByIdService } from "../../services/comments/listCommentById.service";

const listCommentsByIdController = async (request: Request, response: Response): Promise<Response> => {

  const carId = Number(request.params.carId)

  const listComments = await listCommentsByIdService(carId)

  return response.status(200).json(listComments)
}

export { listCommentsByIdController }