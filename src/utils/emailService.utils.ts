import { error } from "console";
import { IEmailRequest } from "../interfaces";
import {createTransport} from 'nodemailer'
import { AppError } from "../errors";
import Mailgen from 'mailgen'

class EmailService {
    async sendEmail({to, subject, text}: IEmailRequest) {
        const transport = createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })

        await transport.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            html: text
        }).then(() => {
            console.log("Email sent with success!")
        }).catch((error) => {
            console.log(error)
            throw new AppError("Error sending email, try again later", 500)
        })
    }

    resetPasswordTemplate(userName: string, userEmail: string, resetToken: string) {
        const mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'Motors Shop',
                link: 'http://localhost:5432'
            }
        })

        const email = {
            body: {
                name: userName,
                intro: 'You have received this email because a password reset request for your account was received.',
                action: {
                    instructions: 'Click the button below to reset your password:',
                    button: {
                        color: '#DC4D2F',
                        text: 'Reset your password',
                        link: `http://localhost:5173/resetPassword/${resetToken}`
                    }
                },
                outro: 'If you did not request a password reset, no further action is required on your part.'
            }
        };

        const emailBody = mailGenerator.generate(email)

        const emailTemplate = {
            to: userEmail,
            subject: "Reset Password",
            text: emailBody
        }

        return emailTemplate
    }
}

export const emailService = new EmailService()