import { Repository } from "typeorm";
import { Car, User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { ICar, IResultCars } from "../../interfaces/cars.interfaces";

export const retriveCarsService = async (userId: number): Promise<ICar[]> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      cars: true,
    },
  });

  if (!user) {
    throw new AppError("User not exists", 404);
  }

  return user.cars;
};
