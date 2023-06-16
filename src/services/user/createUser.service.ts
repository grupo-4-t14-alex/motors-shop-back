import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { Address } from "../../entities/addresses.entity"
import { iUser, iUserRegister, iUserRequest } from "../../interfaces"


const createUserService = async (data: iUserRegister): Promise<iUserRegister> => {

    const userRepository = AppDataSource.getRepository(User)
    const addressRepository = AppDataSource.getRepository(Address)

    const newUserBody = {
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        phone: data.phone,
        birthDate: data.birthDate,
        description: data.description,
        admin: data.admin,
        password: data.password,
        address: {}
    }

    const newAddressBody = {
        cep: data.address.cep,
        estate: data.address.estate,
        city: data.address.city,
        street: data.address.street,
        number: data.address.number,
        complement: data.address.complement
    }

    const newUser = userRepository.create(newUserBody)
    const newAddress = addressRepository.create(newAddressBody)

    await userRepository.save(newUser)
    await addressRepository.save(newAddress)

    const returnBody = {
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        phone: data.phone,
        birthDate: data.birthDate,
        description: data.description,
        admin: data.admin,
        password: data.password,
        cars: [],
        address: {
            cep: data.address.cep,
            estate: data.address.estate,
            city: data.address.city,
            street: data.address.street,
            number: data.address.number,
            complement: data.address.complement
        }

    }

    return returnBody
    
}

export { createUserService }