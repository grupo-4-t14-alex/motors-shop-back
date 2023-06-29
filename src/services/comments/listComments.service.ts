import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities";

const listCommentService = async (): Promise<Comment[]> => {

  const commentRepository = AppDataSource.getRepository(Comment)

  const comments: Comment[] = await commentRepository.find({ relations: ["user_id", "car_id"] })

  return comments

}

export { listCommentService }