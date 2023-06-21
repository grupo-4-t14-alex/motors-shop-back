import { Request, Response } from "express";
import { ICar } from "../../interfaces";
import { retriveCarsService } from "../../services/cars/retriveCars.service";

export const retriveCarsController = async (req: Request, res: Response): Promise<Response> => {
  
  const userId: number = req.user.id

  const cars: ICar[] = await retriveCarsService(userId)

  return res.status(200).json(cars)

}
