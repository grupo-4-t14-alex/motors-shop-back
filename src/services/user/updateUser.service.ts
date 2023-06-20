import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { Address } from "../../entities/addresses.entity"
import { IUserUpdate } from "../../interfaces"
import { AppError } from "../../errors"
import { updateAdressSchema } from "../../schemas"


const updateUserService = async (data : IUserUpdate, userId : number) : Promise<IUserUpdate> => { 

    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)

    const user = await userRepository.findOne({
        where:{
            id: userId
        }
    })

    console.log(user)


    
    if(!user){ 
        throw new AppError("User not found", 404) 
    }



    if(data.address){
        const address = await addressRepository.findOne({
            where:{
                id: user.address.id
            }
        })
        

        const persedDataAddress = updateAdressSchema.parse(data.address)
        Object.assign(address!, persedDataAddress)

        const addressUpdated = addressRepository.create(address!)
        await addressRepository.save(addressUpdated)
    }

    delete data.address 

    Object.assign(user, data)

    const updatedUser = userRepository.create(user)
    await userRepository.save(updatedUser)

    return updatedUser
}



export { updateUserService }