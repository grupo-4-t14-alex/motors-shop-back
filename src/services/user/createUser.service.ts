import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { Address } from "../../entities/addresses.entity"
import { IUserCreateRequest } from "../../interfaces"
import { IUserReturn } from "../../interfaces/users.interfaces"
import { userSchemaReturn } from "../../schemas/users.schemas"


const createUserService = async (data: IUserCreateRequest): Promise<IUserReturn> => {

    const userRepository = AppDataSource.getRepository(User)
    const addressRepository = AppDataSource.getRepository(Address)

    const addressData = data.address

    const user: User = userRepository.create({
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        phone: data.phone,
        birthDate: data.birthDate,
        description: data.description,
        admin: data.admin,
        password: data.password,
    })

    await userRepository.save(user)

    const address: Address = addressRepository.create({
        ...addressData,
        user
    })

    await addressRepository.save(address)

    const userReturn = {
        ...user,
        address: {
            cep: address.cep,
            estate: address.estate,
            city: address.city,
            street: address.street,
            number: address.number,
            complement: address.complement,
        }
    }

    return userSchemaReturn.parse(userReturn)
}

export { createUserService }