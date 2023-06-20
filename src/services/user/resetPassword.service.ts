import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { randomUUID } from "crypto"
import jwt from 'jsonwebtoken'
import { AppError } from "../../errors"
import { emailService } from "../../utils/emailService.utils"
import { hashSync } from "bcryptjs"



export const sendEmailResetPassword = async (email: string) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepo.findOne({
        where: {
            email
        }
    })

    if(!user) throw new AppError("User not found!", 404)

    const resetToken: string = jwt.sign({
        email: user.email,
        resetToken: true
    },
        process.env.SECRET_KEY!,
    {
        expiresIn: "1h",
    })
    
    const resetPasswordTemplate = emailService.resetPasswordTemplate(user.name, email, resetToken)

    await emailService.sendEmail(resetPasswordTemplate)

}

export const resetPasswordService = async (token: string, password: string) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)

    let resetToken: boolean = false
    let userEmail = ""

    jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
        if(error) {
            throw new AppError(error.message, 401)
        }

        resetToken = decoded.resetToken
        userEmail = decoded.email
    })

    const user: User | null = await userRepo.findOne({where: {
        email: userEmail
    }})

    if(!resetToken) throw new AppError("Invalid Token!", 401)

    if(!user) throw new AppError("User not found!", 404)

    await userRepo.save({
        ...user,
        password: hashSync(password, 10)
    })
}