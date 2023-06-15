import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors"

const ensureUserIsAdvertiserMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const advertiser = req.user.admin

    if(req.method === "GET" && !advertiser){
        throw new AppError("Insufficient permission", 403)
    }

    if(req.method === "POST" && !advertiser){
        throw new AppError("Insufficient permission", 403)
    }

    if(req.method === "PATCH" && !advertiser){
        throw new AppError("Insufficient permission", 403)
    }

    if(req.method === "DELETE" && !advertiser){
        throw new AppError("Insufficient permission", 403)
    }
    
    return next()

}

export { ensureUserIsAdvertiserMiddleware }