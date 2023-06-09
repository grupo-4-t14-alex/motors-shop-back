import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Car } from '../../entities'
import { AppError } from "../../errors"

const deleteCarService = async (carId: number): Promise<void> => {
    
    const carsRepository: Repository<Car> = AppDataSource.getRepository(Car)

    const findCar: Car | null = await carsRepository.findOneBy({
        id: carId
    })

    if(!findCar) throw new AppError("Car not found!", 404)

    await carsRepository.delete({
        id: carId
    })

}

export {
    deleteCarService
} 