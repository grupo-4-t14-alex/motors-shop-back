import { Request, Response } from "express";
import { createUserService } from "../../services/user/createUser.service";
import { userSchemaBody } from "../../schemas";
import { registerSchema, updateUserSchema } from "../../schemas/users.schemas";
import { updateUserService } from "../../services";

const createUserController = async (request: Request, response: Response) => {
    
    const dataUser = request.body

    const dataParse = registerSchema.parse(dataUser)

    const newUser = await createUserService(dataParse)

    return response.status(201).json(newUser)

}

const updateUserController = async (request: Request, response: Response) => {
    
    const dataUser = request.body

    const dataParse = updateUserSchema.parse(dataUser)
    const userId: number = request.user.id

    const updatedUser = await updateUserService(dataParse, userId)

    return response.status(200).json(updatedUser)

}

export { createUserController, updateUserController }