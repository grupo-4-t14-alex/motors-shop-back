import { Request, Response } from "express";
import { TCarArray } from "../../interfaces";
import { listCarsService } from "../../services/cars/listCars.services";

export const listCarsController =async (request: Request, response: Response) => {
    
    const cars: TCarArray = await listCarsService()

    return response.status(200).json(cars)

}