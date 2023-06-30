import { Request, Response } from "express";
import { deleteCarService } from "../../services";

const deleteCarController = async (req: Request, res: Response): Promise<Response> => {
    
    const carId: number = parseInt(req.params.id)
    await deleteCarService(carId)
    
    return res.status(204).send()

}

export {
    deleteCarController
} 