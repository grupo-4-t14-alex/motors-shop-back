import { Request, Response } from "express"
import { IUserCreateRequest } from "../../interfaces"
import { createUserService } from "../../services"


const createUserController = async (request: Request, response: Response) : Promise<Response> => {

    const userData: IUserCreateRequest = request.body
    const newUser = await createUserService(userData)

    return response.status(201).json(newUser)

}


export { createUserController }