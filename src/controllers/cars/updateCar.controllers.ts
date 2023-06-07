import { Request, Response } from "express";
import { updateCarsService } from "../../services";
import { ICarUpdateRequest } from "../../interfaces";
import { updateCarSchema } from "../../schemas";
import { Car } from "../../entities";

const updateCarController = async (req: Request, res: Response) => {
  const carData: ICarUpdateRequest = updateCarSchema.parse(req.body);
  const carId: number = parseInt(req.params.carId);
  const newCar:Car = await updateCarsService(carId, carData);
  return res.status(200).json(newCar);
};

export { updateCarController };
