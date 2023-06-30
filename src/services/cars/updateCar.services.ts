import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Car } from "../../entities";
import { AppError } from "../../errors";

const updateCarService = async (CarId: number, carData:any)=> {

  const carsRepo: Repository<Car> = AppDataSource.getRepository(Car);


  const car: Car | null = await carsRepo.findOne({ 
    where:{
    id:CarId
  }});

  if (!car) throw new AppError("Car not found!", 404);

  if (car.isActive == false) throw new AppError("Car not found!", 404);

  const UpdatedCar = carsRepo.create({
    ...car,
    ...carData
  });

  await carsRepo.save(UpdatedCar);

  return UpdatedCar;
};

export { updateCarService }
