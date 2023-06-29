// import { Request, Response } from "express";
// import { listCommentService } from "../../services/comments/listComments.service";

// const listCommentsController = async (_request: Request, response: Response): Promise<Response> => {
//   const comments = await listCommentService();
//   return response.status(200).json(comments);
// };

// export { listCommentsController };

import { Request, Response } from "express";
import { listCommentService } from "../../services/comments/listComments.service";

const listCommentsController = async (_request: Request, response: Response): Promise<Response> => {
  
  const listComments = await listCommentService();

  const commentsWithAuthor = listComments.map(comment => {
    return {
      id: comment.id,
      comment: comment.comment,
      createdAt: comment.createdAt,
      author: {
        authorId: comment.user_id.id,
        authorName: comment.user_id.name
      },
      car: {
        carId: comment.car_id.id,
        brand: comment.car_id.brand,
        model: comment.car_id.model
      }
    };
  });

  return response.status(200).json(commentsWithAuthor);
};

export { listCommentsController };