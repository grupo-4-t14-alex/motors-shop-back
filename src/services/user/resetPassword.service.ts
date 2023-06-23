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

    const resetToken: string = randomUUID()

    await userRepo.save({
        ...user, 
        reset_token: resetToken
    })
    
    const resetPasswordTemplate = emailService.resetPasswordTemplate(user.name, email, resetToken)

    await emailService.sendEmail(resetPasswordTemplate)

}

export const resetPasswordService = async (token: string, password: string) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepo.findOne({
        where: {
            reset_token: token
        }
    })

    if(!user) throw new AppError("User not found!", 404)

    await userRepo.save({
        ...user,
        password: hashSync(password, 10),
        reset_token: null
    })
}