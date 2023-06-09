import { Request, Response } from "express"
import { ICar, ICarCreateRequest } from "../../interfaces"
import { createCarService } from "../../services"
import { createCarSchema } from "../../schemas"

const createCarController = async (req: Request, res: Response): Promise<Response> => {

    const carData: ICarCreateRequest = createCarSchema.parse(req.body)
    const newCar: ICar = await createCarService(carData)

    return res.status(201).json(newCar)

}

export {
    createCarController
}