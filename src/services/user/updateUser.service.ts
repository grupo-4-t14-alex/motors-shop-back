import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { Address } from "../../entities/addresses.entity"
import { IUser, IUserUpdateRequest } from "../../interfaces"
import { AppError } from "../../errors"
import { updateAddressSchema } from "../../schemas"
import { userSchemaReturn } from "../../schemas/users.schemas"



const updateUserService = async (userData: IUserUpdateRequest, userId: number)=> { 

    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)

    const user:User|null = await userRepository.findOne({
        where:{
            id: userId
        },
            relations:["address"]
    })

    if(!user){ 
        throw new AppError("User not found", 404) 
    }

    if(userData.address){

        const address = await addressRepository.findOne({
            where:{
                id: user.address.id
            }
        })

        const persedDataAddress = updateAddressSchema.parse(userData.address)
        Object.assign(address!, persedDataAddress)

        const addressUpdated = addressRepository.create(address!)
        await addressRepository.save(addressUpdated)
    }

    Object.assign(user, userData)
    const updatedUser = userRepository.create(user)
    await userRepository.save(updatedUser)
    
    return  userSchemaReturn.parse(updatedUser)

}



export { updateUserService }