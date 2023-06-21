import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { Address } from "../../entities/addresses.entity"
import { iUser, iUserRegister, iUserRequest } from "../../interfaces"


const createUserService = async (data: any): Promise<any> => {


    const userRepository = AppDataSource.getRepository(User)
    const addressRepository = AppDataSource.getRepository(Address)

    const addressData = data.address

    const address = addressRepository.create(addressData) 
    const newAddress = await addressRepository.save(address)
    console.log("teste1")
    const newUser  = userRepository.create({ ...data, address: newAddress })
    console.log("teste2")
    
    await userRepository.save(newUser)
    console.log("teste3")

    // const res = userRepository.createQueryBuilder("user")
    // .leftJoinAndSelect("user.address", "address")
    // .where("user.email = :email", {email:data.email})
    // .getOne()

    return newUser





    // const newUserBody = {
    //     name: data.name,
    //     email: data.email,
    //     cpf: data.cpf,
    //     phone: data.phone,
    //     birthDate: data.birthDate,
    //     description: data.description,
    //     admin: data.admin,
    //     password: data.password,
    //     address: {}
    // }

    // const newAddressBody = {
    //     cep: data.address.cep,
    //     estate: data.address.estate,
    //     city: data.address.city,
    //     street: data.address.street,
    //     number: data.address.number,
    //     complement: data.address.complement
    // }

    // const newUser = userRepository.create(newUserBody)
    // const newAddress = addressRepository.create(newAddressBody)

    // await userRepository.save(newUser)
    // await addressRepository.save(newAddress)

    // const returnBody = {
    //     name: data.name,
    //     email: data.email,
    //     cpf: data.cpf,
    //     phone: data.phone,
    //     birthDate: data.birthDate,
    //     description: data.description,
    //     admin: data.admin,
    //     password: data.password,
    //     cars: [],
    //     address: {
    //         cep: data.address.cep,
    //         estate: data.address.estate,
    //         city: data.address.city,
    //         street: data.address.street,
    //         number: data.address.number,
    //         complement: data.address.complement
    //     }

    // }

    // return returnBody
    
}

export { createUserService }