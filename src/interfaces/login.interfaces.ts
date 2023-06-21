import { User } from "../entities";
import { iUserRequest } from "./users.interfaces";

export interface iLogin {
    token: string,
    user: iUserRequest
  }