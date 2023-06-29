import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { userSchema } from "../../schemas";

export const retrieveUserService = async (userId: number): Promise<any> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepo.findOne({
    where: {
      id: userId,
    },
    relations: {
      cars: true,
      address: true,
    },
  });

  if (!user) throw new AppError("User not found!", 404);

  return userSchema.parse(user);
};
