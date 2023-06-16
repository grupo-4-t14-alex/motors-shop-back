import { Repository } from "typeorm";
import { Car, User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { IResultCars } from "../../interfaces/cars.interfaces";

export const retriveCarsService = async (
  userId: number,
  page: number
): Promise<IResultCars> => {
  const perPage: number = 12;

  page = page * perPage;

  const carsRepository: Repository<Car> = AppDataSource.getRepository(Car);
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

  const allCars: Car[] = await carsRepository.find();

  const totalCars: number = allCars.length;

  const result = {
    count: totalCars,
    data: user.cars,
  };

  return result;
};
