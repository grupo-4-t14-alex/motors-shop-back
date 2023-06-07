import { Request, Response } from "express";
import { listCarsService } from "../../services";

export const listCarsController =async (request: Request, response: Response) => {
    
    const cars = await listCarsService()

    return response.status(200).json(cars)

}