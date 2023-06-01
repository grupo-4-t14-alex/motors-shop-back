import { Response, Request } from "express";

const createUsersController =  async( request : Request, response : Response ):Promise<Response> => {

    return await response.status(201).json({message: "deu certo"})
}

export {createUsersController}