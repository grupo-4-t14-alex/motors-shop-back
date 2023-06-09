import { Request, Response } from "express";
import { listCarsService } from "../../services";
import { ICar } from "../../interfaces";

export const listCarsController = async (req: Request, res: Response): Promise<Response> => {
    
    const cars: ICar[] = await listCarsService()

    return res.status(200).json(cars)

}