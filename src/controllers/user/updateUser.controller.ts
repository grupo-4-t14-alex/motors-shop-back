import { Request, Response } from "express"
import { updateUserService } from "../../services"


const updateUserController = async (request: Request, response: Response) => {

    const userId = request.user.id
    const body = request.body
    const res = await updateUserService(body,userId)

    return response.status(200).json(res)
}

export { updateUserController}