import { DeepPartial, Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import {Car} from '../../entities'
import { AppError } from "../../errors"
import { ICar, ICarUpdateRequest } from "../../interfaces/cars.interfaces"

//const updateCarsService = async (CarId: number, body:ICarUpdateRequest): Promise<Car> => {

const updateCarsService = async (CarId: number, body:any) => {
    const carsRepo: Repository<Car> = AppDataSource.getRepository(Car)

    //depois precisa pesquisar com o usuario dono do anuncio

    const car: Car | null = await carsRepo.findOneBy({id:CarId})

    if(!car) throw new AppError("Car not found!", 404)

    if(car.isActive == false) throw new AppError("Car not found!", 404)
    

     const UpdatedCar = carsRepo.create({
         ...car,
         ...body

     })

    // car.brand = body.brand || car.brand;
    // car.model = body.model || car.model;
    // car.year = body.year || car.year;
    // car.fuel = body.fuel || car.fuel;
    // car.km = body.km || car.km;
    // car.color = body.color || car.color;
    // car.fipePrice = body.fipePrice || car.fipePrice;
    // car.sellPrice = body.sellPrice || car.sellPrice;
    // car.description = body.description || car.description;
    // car.isActive = body.isActive || car.isActive;


    await carsRepo.save(car)


    return  UpdatedCar
    
}

export default updateCarsService