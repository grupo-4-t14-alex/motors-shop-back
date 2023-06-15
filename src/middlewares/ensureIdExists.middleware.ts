import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { Car, User } from "../entities"
import { AppError } from "../errors"

const ensureIdExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    if(req.path === "/users"){
        const userRepository = AppDataSource.getRepository(User)
     
        const findUser = await userRepository.findOneBy({
            id:  Number(req.params.id)
        })
    
        if(!findUser){
            throw new AppError("User not found", 404) 
        }
    }

    if(req.path === "/cars"){
        const carRepository = AppDataSource.getRepository(Car)

        const findCar = await carRepository.findOneBy({
            id:  Number(req.params.id)
        })

        if(!findCar){
            throw new AppError("Car not found", 404) 
        }
    }

    return next()
}

export { ensureIdExistsMiddleware }