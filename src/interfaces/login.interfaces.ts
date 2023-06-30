import { z } from "zod";
import { loginReturnSchema, loginSchema } from "../schemas";

interface ILogin {
    token: string,
    user: ILoginReturn
  }

type ILoginReturn = z.infer<typeof loginReturnSchema>

type ILoginRequest = z.infer<typeof loginSchema>

export {
  ILogin,
  ILoginReturn,
  ILoginRequest
}