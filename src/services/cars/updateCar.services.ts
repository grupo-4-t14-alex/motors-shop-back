import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import {Car} from '../../entities'
import { AppError } from "../../errors"

const updateCarsService = async (id: number, userId: number, body): Promise<Car> => {
    const carsRepo: Repository<Car> = AppDataSource.getRepository(Car)

    //depois precisa pesquisar com o usuario dono do anuncio

    const car: Car | null = await carsRepo.findOneBy({id})

    if(!car) throw new AppError("Car not found!", 404)

    if(car.isActive == false) throw new AppError("Car not found!", 404)

    const UpdatedCar = carsRepo.create({
        ...car,
        ...body 
    })


    await carsRepo.save(UpdatedCar)


    // tem que serializar 
    return UpdatedCar
    
}

export default updateCarsService