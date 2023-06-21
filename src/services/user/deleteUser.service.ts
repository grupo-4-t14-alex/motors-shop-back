import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { AppError } from "../../errors"

const deleteUserService = async (userAuthId: number, userDeleteId: number): Promise<void>  => {

    if(userAuthId !== userDeleteId) throw new AppError("You don't have permission", 403)
    
    const userRepository = AppDataSource.getRepository(User)

    const findUser: User | null = await userRepository.findOneBy({
        id: userDeleteId
    })

    if(!findUser) throw new AppError("User not found!", 404)

    await userRepository.delete(userDeleteId)

}

export { deleteUserService }