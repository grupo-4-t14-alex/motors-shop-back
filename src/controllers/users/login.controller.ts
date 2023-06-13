import { Request, Response } from "express";
import { LoginRequest } from "../../schemas/login.schema";
import { loginService } from "../../services/login/login.services";

export const loginController = async (req: Request, res: Response): Promise<Response> => {
    const loginRequest: LoginRequest = req.body

    const token: string = await loginService(loginRequest) 

    return res.json({token: token})
}