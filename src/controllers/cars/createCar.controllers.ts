import { Request, Response } from "express"
import { ICarCreateRequest } from "../../interfaces"
import { createCarService } from "../../services"

const createCarController = async (req: Request, res: Response): Promise<Response> => {
    const carData: ICarCreateRequest = req.body
    const carImages = req.files
    const newCar = await createCarService(carData, carImages)

    return res.status(201).json({newCar})

}

export {
    createCarController
}