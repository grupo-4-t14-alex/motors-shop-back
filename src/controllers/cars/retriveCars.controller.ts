import { Request, Response } from "express";
import { listCarsService } from "../../services";
import { ICar } from "../../interfaces";
import { retriveCarsService } from "../../services/cars/retriveCars.service";
import { IResultCars } from "../../interfaces/cars.interfaces";

export const retriveCarsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = req.user.id;

  console.log(userId);

  const cars: IResultCars = await retriveCarsService(userId, 1);

  return res.status(200).json(cars);
};
