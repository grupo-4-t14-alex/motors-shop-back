import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors";

const validateTokenMiddleware = ( request : Request, response : Response, next : NextFunction ) => { 

    let token  = request.headers.authorization

    if(!token){
        throw new AppError("Missing bearer token", 401)
    }

    token = token.split(" ")[1]

    jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) =>{

        if(error){
            throw new AppError(error.message, 401)
        }

        request.user = {
            id: Number(decoded.sub),
            admin: decoded.admin
        }

        return next()

    })
}

export {
    validateTokenMiddleware
}