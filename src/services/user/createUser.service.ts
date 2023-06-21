import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { Address } from "../../entities/addresses.entity"
import { IUser, IUserCreateRequest } from "../../interfaces"



const createUserService = async (userData: IUserCreateRequest): Promise<IUser> => {

    const addressRepository : Repository<Address> = AppDataSource.getRepository(Address)
    const addressData = userData.address
    const address = addressRepository.create(addressData) 
    const newAddress = await addressRepository.save(address)
    
    const userRepository : Repository<User> = AppDataSource.getRepository(User)
    const newUser  = userRepository.create({...userData, address: newAddress  })
    console.log("teste2")
    console.log(newUser)
    
    const test = await userRepository.save(newUser)
    console.log(test)
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