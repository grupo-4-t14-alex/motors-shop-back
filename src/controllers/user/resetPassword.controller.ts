import { Request, Response } from "express"
import { resetPasswordService, sendEmailResetPasswordService } from "../../services"

export const sendEmailResetPasswordController = async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body

    await sendEmailResetPasswordService(email)

    return res.json({message: "Email sent!"})
}

export const resetPasswordController = async(req: Request, res:Response): Promise<Response> => {
    const {token} = req.params
    const {password} = req.body

    await resetPasswordService(token, password)

    return res.json({message: "Password changed with success!"})
}