import { Repository } from "typeorm";
import { Car, User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

export const retriveCarsService = async (userId: number): Promise<any> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const carsRepository: Repository<Car> = AppDataSource.getRepository(Car);

  const user: User | null = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not exists", 404);
  }

  const cars: Car[] = await carsRepository
    .createQueryBuilder("cars")
    .leftJoinAndSelect("cars.user", "user")
    .where("user.id = :userId", { userId })
    .select(["cars", "user.id", "user.description", "user.name"])
    .leftJoinAndSelect("cars.images", "images")
    .getMany();
    
  return cars;
};
