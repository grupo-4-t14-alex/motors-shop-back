import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { Address } from "../../entities/addresses.entity"
import { IUserCreateRequest } from "../../interfaces"
import { IUserReturn } from "../../interfaces/users.interfaces"
import { userSchemaReturn } from "../../schemas/users.schemas"



const createUserService = async (data: IUserCreateRequest) : Promise<IUserReturn> => {

    const userRepository = AppDataSource.getRepository(User)
    const addressRepository = AppDataSource.getRepository(Address)

    const address = addressRepository.create(data.address)
    const newAddress = await addressRepository.save(address)

    const user: User = userRepository.create({ ...data, address: newAddress})
    const userReturn = await userRepository.save(user)

    return userSchemaReturn.parse(userReturn)
}

export { createUserService }