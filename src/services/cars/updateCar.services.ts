import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Car } from "../../entities";
import { AppError } from "../../errors";
import { ICarUpdateRequest } from "../../interfaces";

const updateCarsService = async (
  carId: number,
  carData: ICarUpdateRequest
): Promise<Car> => {
  const carsRepo: Repository<Car> = AppDataSource.getRepository(Car);
  const car: Car | null = await carsRepo.findOneBy({ id: carId });

  if (!car){
    throw new AppError("Car not found!", 404);
  }
  if (car.isActive == false){
    throw new AppError("Car not found!", 404);
  }

  Object.assign(car, carData);
  const updatedCar: Car = carsRepo.create(car);
  await carsRepo.save(updatedCar);
  return updatedCar;
};

export { updateCarsService };
