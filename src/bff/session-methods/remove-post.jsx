import { deletePost } from "../api";

export const removePost = async (postId) => {
  await deletePost(postId);

  return {
    error: null,
    res: {
      post_id: postId,
    },
  };
};
