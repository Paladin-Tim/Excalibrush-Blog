import { createComment } from "../api/create-comment";

export const addComment = async (postId, userId, userLogin, comment) => {
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
