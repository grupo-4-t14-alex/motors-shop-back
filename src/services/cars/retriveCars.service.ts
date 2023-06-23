import { Repository } from "typeorm";
import { Car, User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

export const retriveCarsService = async (userId: number): Promise<any> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const carsRepository: Repository<Car> = AppDataSource.getRepository(Car)

  const user: User | null = await userRepository.findOneBy({id: userId});

  if (!user) {
    throw new AppError("User not exists", 404);
  }

  const cars: Car[] = await carsRepository.createQueryBuilder("cars")
  .leftJoinAndSelect("cars.user", "user", `user.id = ${userId}`)
  .addSelect("user.password", "password")
  .addSelect("user.cpf", "cpf")
  .addSelect("user.phone", "phone")
  .addSelect("user.birthDate", "birthDate")
  .addSelect("user.admin", "admin")
  .addSelect("user.email", "email")
  .getMany()

  return cars;
};
