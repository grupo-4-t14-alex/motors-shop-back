import { Request, Response } from "express";
import deleteCarsServices from "../services/cars/deleteCars.services";

const deleteProductsControllers = async (req: Request, res: Response): Promise<Response> => {
    const productId: number = parseInt(req.params.id)

    await deleteCarsServices(productId)
    
    return res.status(204).send()
}

export default {deleteProductsControllers}