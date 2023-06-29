import { Request, Response } from "express";
import { retrieveUserService } from "../../services/user/retrieveUser.service";

export const retrieveUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = parseInt(req.params.userId);

  const user = await retrieveUserService(userId);

  return res.status(200).json(user);
};
