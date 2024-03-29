import { DeepPartial, Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User, Address } from "../../entities"
import { IUserUpdateRequest } from "../../interfaces"
import { AppError } from "../../errors"
import { updateAddressSchema, userSchemaReturn } from "../../schemas"


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

    if( userData.email){
        const userUniqueEmail :  User| null = await userRepository.findOne({
            where:{
                email: userData.email
            }
        })

        if( userUniqueEmail ){
            if( userUniqueEmail.id != user.id ){
                throw new AppError("Email already exists", 409)
            }
        }
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

    // const updatedUser = userRepository.create( {...user, ...userData} 
    //Object.assign(user, userData)

    userRepository.merge(user, userData as DeepPartial<User>);
    
    await userRepository.save(user)
    return  userSchemaReturn.parse(user)

}



export { updateUserService }