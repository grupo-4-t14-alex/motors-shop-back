import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entities"
import { AppError } from "../errors"

const ensureEmailIsUniqueMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    
    if(req.body.email){

        const userRepository = AppDataSource.getRepository(User)
    
        const findEmail = await userRepository.findOne({
            where: {
                email: req.body.email
            }
        })
    
        if(findEmail){
            throw new AppError("Email already exists", 409) 
        }
    
        return next()
       
    }
    
    return next()
}

export { ensureEmailIsUniqueMiddleware }