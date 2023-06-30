import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities";

const listCommentsByIdService = async (carId: number): Promise<Comment[]> => {
    const commentRepository = AppDataSource.getRepository(Comment);
    const comments: Comment[] = await commentRepository.find({
      where: { car_id: { id: carId } },
      relations: ["user_id", "car_id"]
    });
    return comments;
  };

export { listCommentsByIdService };