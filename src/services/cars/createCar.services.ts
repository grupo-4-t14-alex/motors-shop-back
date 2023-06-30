import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Car, User } from "../../entities";
import { ICar, ICarCreateRequest } from "../../interfaces";
import { Image } from "../../entities/images.entity";
import { AppError } from "../../errors";

const createCarService = async (
  carData: ICarCreateRequest,
  carImages: any,
  userId: number
): Promise<ICar> => {
  const carRepository: Repository<Car> = AppDataSource.getRepository(Car);
  const imageRepository: Repository<Image> = AppDataSource.getRepository(Image);
  const userRepository = AppDataSource.getRepository(User);

  console.log(carData);

  const {
    brand,
    model,
    year,
    fuel,
    km,
    color,
    fipePrice,
    sellPrice,
    description,
  } = carData;

  const findUser: User | null = await userRepository.findOneBy({
    id: userId,
  });

  if (!findUser) {
    throw new AppError("User not exists", 404);
  }

  const newCar: Car = carRepository.create({
    brand,
    model,
    year,
    fuel,
    km,
    color,
    fipePrice,
    sellPrice,
    description,
    user: findUser,
  });

  await carRepository.save(newCar);

  return newCar;
};

export { createCarService };
