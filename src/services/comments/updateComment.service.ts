import { log } from "console";
import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities";
import { AppError } from "../../errors";

const updateCommentService = async (data: any, commentId: string, userId: number) => {

    const commentRepository = AppDataSource.getRepository(Comment)

    const commentExist: Comment | null = await commentRepository.findOne({
        where: {
            id: commentId
        },
        relations: ['user_id']
    })

    if(commentExist){
        console.log(commentExist.user_id.id, userId)
    }

    if(!commentExist){
        throw new AppError("Comment not found", 404)
    }

    if(commentExist.user_id.id != userId){
        throw new AppError("User not authorized", 401)
    }

    const updatedComment = commentRepository.create({
        ...commentExist,
        ...data
    })

    await commentRepository.save(updatedComment)

}

export {
    updateCommentService
}