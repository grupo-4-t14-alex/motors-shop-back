import { Request, Response } from "express"
import { deleteUserService } from "../../services"

const deleteUserController = async (req: Request, res: Response): Promise<Response> => {

    const userAuthId: number = req.user.id
    const userDeleteId: number = parseInt(req.params.id)
    
    await deleteUserService(userAuthId, userDeleteId)

    return res.status(204).send()

}

export { deleteUserController }
