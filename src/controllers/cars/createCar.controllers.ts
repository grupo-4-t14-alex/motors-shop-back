import { Request, Response } from "express"
import { ICarCreateRequest } from "../../interfaces"
import { createCarService } from "../../services"

const createCarController = async (req: Request, res: Response) => {

    const carData: ICarCreateRequest = req.body
    const newCar = await createCarService(carData)

    return res.status(201).json(newCar)

}

export {
    createCarController
}