import { AppDataSource } from "../../data-source"
import { Comment } from "../../entities"
import { AppError } from "../../errors"

const deleteCommentService = async (commentId: string): Promise<void> => {

    const commentRepository = AppDataSource.getRepository(Comment)

    const commentFinded: Comment | null = await commentRepository.findOneBy({
        id: commentId
    })

    if(!commentFinded){
        throw new AppError("Comment not found", 404)
    }

    await commentRepository.delete(commentId)

}

export {
    deleteCommentService
}