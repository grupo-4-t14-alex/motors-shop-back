import { Repository } from "typeorm";
import { LoginRequest } from "../../schemas/login.schema";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginService = async (
  loginRequest: LoginRequest
): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({
    email: loginRequest.email,
  });

  if (!user) throw new AppError("Invalid credentials!", 401);

  const passwordValid: boolean = await compare(
    loginRequest.password,
    user.password
  );

  if (!passwordValid) throw new AppError("Invalid credentials", 401);

  const token: string = jwt.sign(
    {
      email: user.email,
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(user.id),
    }
  );

  return token;
};
