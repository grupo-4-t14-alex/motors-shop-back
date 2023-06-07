import { Repository } from "typeorm"
import { Car } from "../../entities"
import { AppDataSource } from "../../data-source"
import { ICar } from "../../interfaces"

export const listCarsService = async (): Promise<ICar[]> => {
    
    const carsRepository: Repository<Car> = AppDataSource.getRepository(Car)

    const findCars: Array<ICar> = await carsRepository.find()

    return findCars

}