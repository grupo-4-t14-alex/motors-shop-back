import { IUserCreateRequest } from "./users.interfaces";

export interface ILogin {
    token: string,
    user: IUserCreateRequest
  }