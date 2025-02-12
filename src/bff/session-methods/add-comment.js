import { createComment } from "../api/create-comment";
import { ROLE } from "../constants";
import { sessions } from "../sessions";

export const addComment = async (
  userSession,
  postId,
  userId,
  userLogin,
  comment,
) => {
  // const accessRoles = [ROLE.ADMIN, ROLE.MODER, ROLE.USER];

  // if (!sessions.access(userSession, accessRoles)) {
  //   return {
  //     error: "Access denied!",
  //     res: null,
  //   };
  // }
  const newComment = await createComment(postId, userId, userLogin, comment);

  const { id, author_id, author_name, published_at, content } = newComment;

  return {
    error: null,
    res: {
      [id]: {
        id,
        author_id,
        author_name,
        published_at,
        content,
      },
    },
  };
};
