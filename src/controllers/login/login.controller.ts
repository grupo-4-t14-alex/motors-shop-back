import { Request, Response } from "express";
import { ILoginRequest, ILogin } from "../../interfaces";
import { loginService } from "../../services";

export const loginController = async (req: Request, res: Response): Promise<Response> => {
    const loginRequest: ILoginRequest = req.body

    const login: ILogin = await loginService(loginRequest) 

    return res.json(login)
}