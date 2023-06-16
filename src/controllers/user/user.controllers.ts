import { Request, Response } from "express";
import { createUserService } from "../../services/user/createUser.service";
import { userSchemaBody } from "../../schemas";
import { registerSchema } from "../../schemas/users.schemas";

const createUserController = async (request: Request, response: Response) => {
    
    const dataUser = request.body

    const dataParse = registerSchema.parse(dataUser)

    const newUser = await createUserService(dataParse)

    return response.status(201).json(newUser)

}

export { createUserController }