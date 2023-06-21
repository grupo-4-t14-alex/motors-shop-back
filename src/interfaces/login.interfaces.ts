import { IUser } from "./users.interfaces";

export interface ILogin {
    token: string,
    user: IUser
  }