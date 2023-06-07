import { Repository } from "typeorm"
import { Car } from "../../entities"
import { AppDataSource } from "../../data-source"
import { carArraySchema } from "../../schemas"
import { TCarArray } from "../../interfaces"

export const listCarsService = async (): Promise<TCarArray> => {
    
    const carsRepository: Repository<Car> = AppDataSource.getRepository(Car)

    const findCar: Array<Car> = await carsRepository.find()

    const cars = carArraySchema.parse(findCar)

    return cars

}