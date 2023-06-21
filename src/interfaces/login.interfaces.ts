import { z } from "zod";
import { IUser } from "./users.interfaces";
import { loginReturnSchema } from "../schemas/login.schema";

export interface ILogin {
    token: string,
    user: ILoginReturn
  }

type ILoginReturn = z.infer<typeof loginReturnSchema>