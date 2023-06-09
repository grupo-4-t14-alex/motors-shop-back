import { Request, Response } from "express";
import { updateCarService } from "../../services";
import { ICarUpdateRequest } from "../../interfaces";
import { updateCarSchema } from "../../schemas";
import { Car } from "../../entities";

const updateCarController = async (req: Request, res: Response) => {
  const carData: ICarUpdateRequest = updateCarSchema.parse(req.body);
  const carId: number = parseInt(req.params.id);
  const newCar: Car[] = await updateCarService(carId, carData);
  return res.status(200).json(newCar);
};

export { updateCarController };
