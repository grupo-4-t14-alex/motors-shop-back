import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import {Car} from '../../entities'
import { AppError } from "../../errors"

const deleteCarsService = async (id: number): Promise<void> => {
    const carsRepo: Repository<Car> = AppDataSource.getRepository(Car)

    const car: Car | null = await carsRepo.findOneBy({id})

    if(!car) throw new AppError("Car not found!", 404)

    if(car.isActive == false) throw new AppError("Car not found!", 404)

    await carsRepo.softRemove(car!)
}

export default deleteCarsService