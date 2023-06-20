import { Repository } from "typeorm"
import { Car } from "../../entities"
import { AppDataSource } from "../../data-source"
import { ICar } from "../../interfaces"

export const listCarsService = async (): Promise<ICar[]> => {
    
    const carsRepository: Repository<Car> = AppDataSource.getRepository(Car)

    /* const findCars: Array<ICar> = await carsRepository.find({
        relations: {
            user: true
        }
    }) */

    const findCars = await carsRepository.createQueryBuilder("cars")
    .leftJoinAndSelect("cars.user", "user")
    .addSelect("user.password", "password")
    .addSelect("user.cpf", "cpf")
    .addSelect("user.email", "email")
    .addSelect("user.phone", "phone")
    .addSelect("user.birthDate", "birthDate")
    .addSelect("user.admin", "admin")
    .getMany();

    return findCars

}