import { AppDataSource } from "../../data-source"
import { User, Address } from "../../entities"
import { IUserCreateRequest, IUserReturn } from "../../interfaces"
import { userSchemaReturn } from "../../schemas"

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