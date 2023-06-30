import { Request, Response } from "express";
import { ICar, ICarUpdateRequest } from "../../interfaces";
import { updateCarSchema } from "../../schemas";
import { updateCarService } from "../../services";

const updateCarController = async (req: Request, res: Response): Promise<Response> => {

  const carId: number = parseInt(req.params.id)
  const carData: ICarUpdateRequest = updateCarSchema.parse(req.body)
  const updatedCar = await updateCarService(carId, carData)

  return res.status(200).json(updatedCar)

}

export { 
  updateCarController
}
