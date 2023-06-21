import { Request, Response } from "express";
import { LoginRequest } from "../../schemas/login.schema";
import { loginService } from "../../services/login/login.services";
import { iLogin } from "../../interfaces/login.interfaces";

export const loginController = async (req: Request, res: Response): Promise<Response> => {
    const loginRequest: LoginRequest = req.body

    const login: iLogin = await loginService(loginRequest) 

    return res.json(login)
}