import { deleteComment } from "../api";

export const removeComment = async (postId, commentId) => {
  await deleteComment(postId, commentId);

  return {
    error: null,
    res: {
      post_id: postId,
      comment_id: commentId,
    },
  };
};
