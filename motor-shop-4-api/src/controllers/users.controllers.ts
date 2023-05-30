import { Response, Request } from "express";

const createUsersController = async ( request : Request, response : Response ) : Promise<Response> => {

    return response.json({message: "deu certo"})
}

export {createUsersController}