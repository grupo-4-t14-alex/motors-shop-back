import { Request, Response } from "express";
import { createImagesService } from "../../services/images/createImages.service";

export const createImagesControllers = async (req: Request, res: Response): Promise<Response> => {
    const files: any = req.files
    const carId: number = Number(req.params.carId)
    
    const response = await createImagesService(files, carId)
    
    return res.status(201).json(response)
}