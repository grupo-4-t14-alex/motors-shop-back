import { AppDataSource } from "../../data-source";
import { Car, Comment, User } from "../../entities";
import { AppError } from "../../errors";
import { iComment, iCommentReturn } from "../../interfaces";

const createCommentService = async (data: iComment, userId: number, carId: number): Promise<iCommentReturn> => {
    
    const commentRepository = AppDataSource.getRepository(Comment)
    const userRepository = AppDataSource.getRepository(User)
    const carRepository = AppDataSource.getRepository(Car)

    const userFinded: User | null = await userRepository.findOneBy({
        id: userId
    })

    if(!userFinded){
        throw new AppError("User not exists", 404)
    }

    const carFinded: Car | null = await carRepository.findOneBy({
        id: carId
    })

    if(!carFinded){
        throw new AppError("Car not exists", 404)
    }

    const newComment: Comment = commentRepository.create({
        comment: data.comment,
        car_id: carFinded,
        user_id: userFinded,
    })

    await commentRepository.save(newComment)

    return newComment

}

export { createCommentService }