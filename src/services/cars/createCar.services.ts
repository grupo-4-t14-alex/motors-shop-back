import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Car } from "../../entities";
import { ICar, ICarCreateRequest } from "../../interfaces";

const createCarService = async (carData: ICarCreateRequest): Promise<ICar> => {

    const carRepository: Repository<Car> = AppDataSource.getRepository(Car)

    const newCar = carRepository.create(carData)

    await carRepository.save(newCar)

    return newCar

}

export {
    createCarService
}