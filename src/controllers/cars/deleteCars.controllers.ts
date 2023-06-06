import { Request, Response } from "express";
import { deleteCarsService } from "../../services";

const deleteProductsControllers = async (req: Request, res: Response): Promise<Response> => {
    const productId: number = parseInt(req.params.id)

    await deleteCarsService(productId)
    
    return res.status(204).send()
}

export default {deleteProductsControllers}