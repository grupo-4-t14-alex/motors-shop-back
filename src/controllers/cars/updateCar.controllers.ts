import { Request, Response } from "express"
import updateCarsService from "../../services/cars/updateCar.services"
import { ICarUpdateRequest } from "../../interfaces/cars.interfaces"
import { carSchema } from "../../schemas"
import { updateCarSchema } from "../../schemas/cars.schemas"

const updateCarController = async (req: Request, res: Response) => {

    const carData: ICarUpdateRequest = updateCarSchema.parse( req.body)
    const carId: number = Number(req.params.carId)
    const newCar = await updateCarsService(carId,carData)
 
    const resp = carSchema.parse( newCar)
    return res.status(201).json(resp)

}

export {
    updateCarController
}